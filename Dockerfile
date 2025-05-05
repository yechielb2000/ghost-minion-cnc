FROM python:3.12-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY ./cnc /app/cnc
COPY ./uv.lock /app
COPY ./pyproject.toml /app

WORKDIR /app

RUN uv sync --frozen --no-cache

#CMD [".venv/bin/uvicorn", "cnc.app:app", "--host", "0.0.0.0", "--port", "8000"]
