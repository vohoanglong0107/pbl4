#!/bin/bash
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python - && \
    echo 'export PATH=\"$HOME/.poetry/bin:$PATH\"' | tee -a $HOME/.bashrc $HOME/.zshrc && \
    source $HOME/.poetry/env && \
    poetry config virtualenvs.create false --local && \
    poetry install