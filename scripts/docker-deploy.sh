#! /bin/sh

docker run --rm --shm-size=1g \
        --ulimit memlock=-1 \
        --ulimit stack=67108864 \
        -p8080:8080 \
        -p8081:8081 \
        -p8082:8082 \
        -p7070:7070 \
        -p7071:7071 \
        -v ~/pbl4_backend/model_store:/home/model-server/model-store \
        --name=torchserve \
        pytorch/torchserve \
        torchserve --start --model-store=/home/model-server/model-store --models qa.mar ocr.mar --ncs
