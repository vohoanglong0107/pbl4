from abc import ABC
import json
import logging
import os
import ast
import torch
import transformers
from transformers import (
    AutoTokenizer,
    AutoModelForSeq2SeqLM,
)
from ts.torch_handler.base_handler import BaseHandler

logger = logging.getLogger(__name__)
logger.info("Transformers version %s", transformers.__version__)


class QAHandler(BaseHandler, ABC):
    """
    Transformers handler class for sequence, token classification and question answering.
    """

    def __init__(self):
        super(QAHandler, self).__init__()
        self.initialized = False

    def initialize(self, ctx):
        self.manifest = ctx.manifest
        properties = ctx.system_properties
        model_dir = properties.get("model_dir")

        self.device = torch.device(
            "cuda:" + str(properties.get("gpu_id"))
            if torch.cuda.is_available() and properties.get("gpu_id") is not None
            else "cpu"
        )
        # read configs for the mode, model_name, etc. from setup_config.json
        setup_config_path = os.path.join(model_dir, "setup_config.json")
        if os.path.isfile(setup_config_path):
            with open(setup_config_path) as setup_config_file:
                self.setup_config = json.load(setup_config_file)
        else:
            logger.warning("Missing the setup_config.json file.")

        # Loading the model and tokenizer from checkpoint and config files based on the user's choice of mode
        # further setup config can be added.
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_dir)
        self.tokenizer = AutoTokenizer.from_pretrained(model_dir)
        self.model.eval()
        logger.info("Transformer model from path %s loaded successfully", model_dir)

        self.initialized = True

    def preprocess(self, requests):
        input_batch = []
        max_length = self.setup_config["max_length"]
        for idx, data in enumerate(requests):
            input_text = data.get("data")
            if input_text is None:
                input_text = data.get("body")
            if isinstance(input_text, (bytes, bytearray)):
                input_text = input_text.decode("utf-8")
            # TODO include captum explainer
            logger.info("Received text: '%s'", input_text)
            # preprocessing text for sequence_classification and token_classification.

            qa = input_text
            inputs = (
                "question: "
                + qa["question"]
                + "".join(
                    [
                        " choice " + str(i + 1) + ": " + answer
                        for i, answer in enumerate(
                            [qa["answerA"], qa["answerB"], qa["answerC"], qa["answerD"]]
                        )
                    ]
                )
                + " context: "
                + qa["passage"].replace("\n", "").replace("\t", "")
            )
            input_batch.append(inputs)
        inputs = self.tokenizer(
            input_batch,
            max_length=int(max_length),
            padding="max_length",
            return_tensors="pt",
        )
        input_ids = inputs["input_ids"].to(self.device)
        attention_mask = inputs["attention_mask"].to(self.device)
        return (input_ids, attention_mask)

    def inference(self, input_batch):
        input_ids_batch, attention_mask_batch = input_batch
        # Handling inference for question_answering.

        outputs = self.tokenizer.batch_decode(
            self.model.generate(
                input_ids=input_ids_batch, attention_mask=attention_mask_batch
            ),
            skip_special_tokens=True,
        )
        return outputs

    def postprocess(self, inference_output):
        return inference_output
