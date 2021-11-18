from abc import ABC
import base64
import io
import json
import logging
import os

import numpy as np
from PIL import Image
from ts.torch_handler.base_handler import BaseHandler

from pbl4_ocr import Reader
from pbl4_ocr.utils import get_raw_text

logger = logging.getLogger(__name__)


class OCRHandler(BaseHandler, ABC):

    def __init__(self):
        super(OCRHandler, self).__init__()
        self.initialized = False

    def initialize(self, ctx):
        self.manifest = ctx.manifest
        properties = ctx.system_properties
        model_dir = properties.get("model_dir")

        # read configs for the mode, model_name, etc. from setup_config.json
        setup_config_path = os.path.join(model_dir, "setup_config.json")
        if os.path.isfile(setup_config_path):
            with open(setup_config_path) as setup_config_file:
                self.setup_config = json.load(setup_config_file)
        else:
            logger.warning("Missing the setup_config.json file.")

        self.reader = Reader(
            self.setup_config["lang_list"],
            model_storage_directory=model_dir,
            recog_network=self.setup_config["recog_network"],
        )
        logger.info("OCR model from path %s loaded successfully", model_dir)

        self.initialized = True

    def preprocess(self, data):
        images = []
        for row in data:
            image = row.get("data") or row.get("body")
            if isinstance(image, str):
                # if the image is a string of bytesarray.
                image = base64.b64decode(image)

            # If the image is sent as bytesarray
            if isinstance(image, (bytearray, bytes)):
                image = np.asarray(Image.open(io.BytesIO(image)))
            else:
                # if the image is a list
                image = np.array(image, dtype=np.float32)

            images.append(image)

        return images

    def inference(self, input_batch):
        outputs = []
        for image in input_batch:
            output = self.reader.readtext(image)
            outputs.append(get_raw_text(output))
        return outputs

    def postprocess(self, inference_output):
        return inference_output
