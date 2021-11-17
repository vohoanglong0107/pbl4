Prerequisites:
============
1. A kubernetes cluster with at least 3 or more running kubernetes nodes. (not sure 2 is enough)
2. At least 1 volume attach to the nodes, unformatted.


Setup cluster:

    #Install rook-ceph
    cd torchserve/kubernetes

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


Setup torchserve:

    # back to project root

    # archive model mar, result will be saved in the model-store:
    scripts/docker-torch-model-archive.sh

    # create persistent volume claim for model storage
    kubectl create -f torchserve/kubernetes/pvc.yaml

    # uploading model mar
    kubectl create -f torchserve/kubernetes/model-store-pod.yaml
    kubectl exec --tty pod/model-store-pod -- mkdir /pv/model-store/
    kubectl cp model-store/ocr.mar model-store-pod:/pv/model-store/ocr.mar
    kubectl cp model-store/qa.mar model-store-pod:/pv/model-store/qa.mar
    kubectl exec --tty pod/model-store-pod -- mkdir /pv/config
    kubectl cp torchserve/config.properties model-store-pod:/pv/config/config.properties

    # inspect volume mount
    kubectl exec --tty pod/model-store-pod -- ls -lR /pv/

    # as model had been uploaded to pvc, delete the pod
    kubectl delete pod/model-store-pod

    # change value in torchserve/config.properties and torchserve/kubernetes/values.yaml to match your usage
    # Install torchserve
    helm install ts torchserve/kubernetes

