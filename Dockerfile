# [Choice] Python version: 3, 3.8, 3.7, 3.6
ARG VARIANT=3.8
FROM python:${VARIANT} as builder

COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:${VARIANT}-slim as production
WORKDIR /pbl4_backend

COPY --from=builder /root/.local /root/.local

COPY ./pbl4_backend /pbl4_backend
ENV PATH=/root/.local/bin:$PATH

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]

