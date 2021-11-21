import transformers
from pathlib import Path
import os
import json
import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, set_seed

""" This function, save the checkpoint, config file along with tokenizer config and vocab files
    of a transformer model of your choice.
"""
print("Transformers version", transformers.__version__)
set_seed(1)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def transformers_model_dowloader(pretrained_model_name):
    print("Download model and tokenizer", pretrained_model_name)
    # loading pre-trained model and tokenizer
    model = AutoModelForSeq2SeqLM.from_pretrained(pretrained_model_name)
    tokenizer = AutoTokenizer.from_pretrained(pretrained_model_name)

    NEW_DIR = "./Transformer_model"
    try:
        os.mkdir(NEW_DIR)
    except OSError:
        print("Creation of directory %s failed" % NEW_DIR)
    else:
        print("Successfully created directory %s " % NEW_DIR)

    print(
        "Save model and tokenizer/ Torchscript model based on the setting from setup_config",
        pretrained_model_name,
        "in directory",
        NEW_DIR,
    )

    model.save_pretrained(NEW_DIR)
    tokenizer.save_pretrained(NEW_DIR)

    return


if __name__ == "__main__":
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, "setup_config.json")
    f = open(filename)
    settings = json.load(f)
    model_name = settings["model_name"]

    transformers_model_dowloader(model_name)
