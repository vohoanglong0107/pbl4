#!/bin/sh -e
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | python -
. /home/venv/bin/activate
poetry install