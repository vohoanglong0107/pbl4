import os
import requests
from zipfile import ZipFile
from tqdm import tqdm


def wget(url, filename=None):
    if filename is None:
        filename = url.split("/")[-1]
    response = requests.get(url, stream=True)
    total_size = int(response.headers.get("content-length", 0))
    block_size = 1024
    t = tqdm(total=total_size, unit="iB", unit_scale=True)
    with open(filename, "wb") as f:
        for data in response.iter_content(block_size):
            t.update(len(data))
            f.write(data)
    t.close()


if __name__ == "__main__":
    model_dir = "OCR_model"
    if not os.path.exists(model_dir):
        os.mkdir(model_dir)
    wget("https://github.com/JaidedAI/EasyOCR/releases/download/pre-v1.1.6/craft_mlt_25k.zip", os.path.join(model_dir, "craft_mlt_25k.zip"))
    with ZipFile(os.path.join(model_dir, "craft_mlt_25k.zip"), "r") as zip_ref:
        zip_ref.extractall(model_dir)
    wget("https://github.com/vohoanglong0107/pbl4-ORC/releases/download/v0.1.0/VBC.pth", os.path.join(model_dir, "VBC.pth"))
    wget("https://github.com/vohoanglong0107/pbl4-ORC/releases/download/v0.1.0/VBC.yaml", os.path.join(model_dir, "VBC.yaml"))
