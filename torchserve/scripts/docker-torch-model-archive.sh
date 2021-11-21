#! /bin/bash

trap cleanup ERR EXIT 1 2 3 9

cleanup()
{
  echo "Caught Signal ... cleaning up."
  docker container stop mar
  echo "Done cleanup ... quitting."
  exit 1
}

if [ -d "model-store" ]; then
    echo "model-store directory already exists"
    exit 1
fi

mkdir model-store
chmod 777 model-store

docker run \
    --rm \
    -it \
    -d \
    -p 8080:8080 \
    -p 8081:8081 \
    --name mar \
    -v $(pwd)/model-store:/home/model-server/model-store \
    -v $(pwd)/qa:/home/model-server/torchserve/qa \
    -v $(pwd)/ocr:/home/model-server/torchserve/ocr \
    mamlong34/torchserve:python-3.8

docker exec -it mar /bin/bash -c \
    "pip install transformers==4.12.3"

docker exec -it mar /bin/bash -c \
    "python torchserve/qa/download_transformers_model.py"
docker exec -it mar /bin/bash -c \
    "torch-model-archiver \
        --model-name qa \
        --version 0.1.0 \
        --serialized-file Transformer_model/pytorch_model.bin \
        --handler torchserve/qa/qa_handler.py \
        --export-path /home/model-server/model-store \
        --extra-files \"Transformer_model/config.json,Transformer_model/special_tokens_map.json,Transformer_model/tokenizer_config.json,Transformer_model/tokenizer.json,torchserve/qa/setup_config.json\" \
        -r torchserve/qa/requirements.txt"

docker exec -it mar /bin/bash -c \
    "python torchserve/ocr/download_ocr_model.py"
docker exec -it mar /bin/bash -c \
    "torch-model-archiver \
        --model-name ocr \
        --version 0.1.0 \
        --serialized-file OCR_model/VBC.pth \
        --handler torchserve/ocr/ocr_handler.py \
        --export-path /home/model-server/model-store \
        --extra-files \"OCR_model/craft_mlt_25k.pth,OCR_model/VBC.yaml,torchserve/ocr/setup_config.json\" \
        -r torchserve/ocr/requirements.txt"
