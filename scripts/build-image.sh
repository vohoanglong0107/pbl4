#! /bin/bash

# build from torchserve context

if [ $# -lt 4 ]; then
    echo "Usage: $0 <image-name> <docker-file> <context>"
    exit 1
fi

docker image build -t $1 -f $2 $3