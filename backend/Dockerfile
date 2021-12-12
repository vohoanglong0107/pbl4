# [Choice] Python version: 3, 3.8, 3.7, 3.6
ARG VARIANT=3.8
FROM python:${VARIANT}-slim as builder

RUN python -m venv /home/venv
ENV PATH="/home/venv/bin:$PATH"

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

FROM python:${VARIANT}-slim as production

COPY --from=builder /home/venv /home/venv
ENV PATH="/home/venv/bin:$PATH"

COPY ./app ./app
COPY ./alembic ./alembic
COPY ./alembic.ini ./alembic.ini
COPY ./entrypoint.sh ./entrypoint.sh
ENV PATH=/root/.local/bin:$PATH

EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]

