#!/usr/bin/env bash

set -x

mypy app
black app --check
isort --check-only app
flake8 --max-line-length=88