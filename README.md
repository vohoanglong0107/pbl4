# English problem solver <!-- omit in toc -->

- [About this project](#about-this-project)
  - [Descriptions](#descriptions)
  - [Technologies](#technologies)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [AI](#ai)
    - [Developing](#developing)
    - [Deployment](#deployment)
- [Setup](#setup)
  - [Install rook/ceph on cluster](#install-rookceph-on-cluster)
  - [Setup torchserve model with backend and frontend](#setup-torchserve-model-with-backend-and-frontend)

## About this project

### Descriptions

It is often the case that you got a homework assignment, and you can't find a solution online. You try to ask your friends, but nobody is willing to help you. This project aim to solve this problem. It is a web application that can help you to find a solution for an English problem.

### Technologies

#### Frontend

Next.js, a React framework, is used as the frontend framework. To handle the user authentication, Firebase is used. Finally, the decorate the UI, the [Material-UI](https://material-ui.com/) is used.

#### Backend

Here, FastAPI framework is used for the backend server for its simplicity.

#### AI

For the AI models used for problem solving, I used [a T5 models](https://huggingface.co/mamlong34/t5_base_race_cosmos_qa) trained on [the Race dataset](https://huggingface.co/datasets/race), then deployed it as a separate entity using Torchserve.

#### Developing

To avoid [work on my machine problem](https://blog.codinghorror.com/the-works-on-my-machine-certification-program/), I used [dev container](https://code.visualstudio.com/docs/remote/containers) features of vscode to create a developing environment without installing any dependencies, avoid polluting personal laptop while having most functionalities supported by vscode.

#### Deployment

Each part of the project is containerized separately using Docker, then all of them are deployed to [Digital Ocean Kubernetes](https://www.digitalocean.com/products/kubernetes). For the AI models, in order to avoid the duplication of models copy on each instances, I used Rook/Ceph [shared filesystem](https://github.com/rook/rook/blob/master/Documentation/ceph-filesystem.md) features.

## Setup

Requirements:

- A kubernetes cluster with at least 3 or more running kubernetes nodes.
- At least 3 volume, attach to each nodes, unformatted.

### Install rook/ceph on cluster

    #Install rook-ceph
    cd kubernetes

    # install lvm2 on each node
    kubectl apply -f setupnodes.yaml

    # install rook operator
    kubectl create -f crds.yaml -f common.yaml -f operator.yaml

    # verify the rook-ceph-operator is in the `Running` state before proceeding
    kubectl -n rook-ceph get pod

    # create the cluster
    kubectl create -f cluster.yaml

    # inspect cluster status
    kubectl -n rook-ceph get pod

    # Create Ceph file system
    kubectl create -f filesystem.yaml

    # create the storageclass for provision
    kubectl create -f storageclass.yaml

    # (Optionals) connect to the Rook toolbox for health checking
    kubectl create -f toolbox.yaml
    kubectl -n rook-ceph rollout status deploy/rook-ceph-tools # Wait for the toolbox pod to download its container and get to the running state
    kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash # Connect to the toolbox pod
    ceph status

### Setup torchserve model with backend and frontend

    # back to root dir
    cd ..

    # archive model mar, result will be saved in the model-store:
    torchserve/scripts/docker-torch-model-archive.sh

    # create new kubernetes namespace
    kubectl create ns pbl4

    # create persistent volume claim for model storage
    kubectl create -f kubernetes/pvc.yaml

    # uploading model mar
    kubectl create -f kubernetes/model-store-pod.yaml
    kubectl -n pbl4 exec --tty pod/model-store-pod -- mkdir /pv/model-store/
    kubectl -n pbl4 cp torchserve/model-store/ocr.mar model-store-pod:/pv/model-store/ocr.mar
    kubectl -n pbl4 cp torchserve/model-store/qa.mar model-store-pod:/pv/model-store/qa.mar
    kubectl -n pbl4 exec --tty pod/model-store-pod -- mkdir /pv/config
    kubectl -n pbl4 cp torchserve/config.properties model-store-pod:/pv/config/config.properties

    # inspect volume mount
    kubectl -n pbl4 exec --tty pod/model-store-pod -- ls -lR /pv/

    # as model had been uploaded to pvc, delete the pod
    kubectl -n pbl4 delete pod/model-store-pod

    # (Optionals) assure the pvc is working 
    kubectl create -f kubernetes/model-inspect-pod.yaml # create inspect pod
    kubectl -n pbl4 exec --tty pod/model-inspect-pod -- ls -lR /pv/shared

    # change value in config.properties and values.yaml to match your usage
    # Install full project as helm
    helm install pbl4 kubernetes
