# English problem solver <!-- omit in toc -->
- [Kubernetes cluter overvi](#kubernetes-cluter-overvi)
- [Setup](#setup)
  - [Install rook/ceph on cluster](#install-rookceph-on-cluster)
  - [Setup torchserve model with backend and frontend](#setup-torchserve-model-with-backend-and-frontend)

## Kubernetes cluter overvi 

![](image/kubernetes.drawio.png)

## Setup
1. A kubernetes cluster with at least 3 or more running kubernetes nodes. 
2. At least 3 volume, attach to each nodes, unformatted.


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

