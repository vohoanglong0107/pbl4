from typing import Tuple
from transformers import (
    AutoModelForSeq2SeqLM,
    AutoTokenizer,
    PreTrainedTokenizerFast,
    PreTrainedModel,
)


def load_model() -> Tuple[PreTrainedTokenizerFast, PreTrainedModel]:
    model_name = "mamlong34/t5_base_race_cosmos_qa"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    return tokenizer, model


def run_prediction(
    tokenizer: PreTrainedTokenizerFast, model: PreTrainedModel, input: str
):
    return tokenizer.batch_decode(
        model.generate(tokenizer(input, return_tensors="pt").input_ids),
        skip_special_tokens=True,
    )[0]
