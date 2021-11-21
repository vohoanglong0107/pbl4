#! /bin/sh
# qa

trap cleanup ERR EXIT 1 2 3 9

cleanup()
{
  echo "Caught Signal ... cleaning up."
  echo "Done cleanup ... quitting."
  exit 1
}

python torchserve/qa/download_transformers_model.py
torch-model-archiver \
    --model-name qa \
    --version 0.1.0 \
    --serialized-file Transformer_model/pytorch_model.bin \
    --handler torchserve/qa/qa_handler.py \
    --extra-files "Transformer_model/config.json,Transformer_model/special_tokens_map.json,Transformer_model/tokenizer_config.json,Transformer_model/tokenizer.json,torchserve/qa/setup_config.json" \
    -r requirements.txt
# ocr
python torchserve/ocr/download_ocr_model.py
torch-model-archiver \
    --model-name ocr \
    --version 0.1.0 \
    --serialized-file OCR_model/VBC.pth \
    --handler torchserve/ocr/ocr_handler.py \
    --extra-files "OCR_model/craft_mlt_25k.pth,OCR_model/VBC.yaml,torchserve/ocr/setup_config.json" \
    -r requirements.txt

mkdir -p model_store
mv qa.mar model_store/
mv ocr.mar model_store/