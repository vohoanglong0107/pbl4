#! /bin/sh

docker run --rm --shm-size=1g \
        --ulimit memlock=-1 \
        --ulimit stack=67108864 \
        -p8080:8080 \
        -p8081:8081 \
        -p8082:8082 \
        -p7070:7070 \
        -p7071:7071 \
        -v $(pwd)/torchserve/model-store:/home/model-server/model-store \
        -v $(pwd)/torchserve/config.properties:/home/model-server/config.properties \
        --name=torchserve \
        mamlong34/torchserve:python-3.8 \
        torchserve --start --model-store=/home/model-server/model-store --models ocr.mar qa.mar --ncs
