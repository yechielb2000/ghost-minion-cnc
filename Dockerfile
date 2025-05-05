FROM python:3.12-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY ./cnc /cnc

WORKDIR /cnc

RUN uv sync --frozen --no-cache

CMD ["/app/.venv/bin/fastapi", "run", "cnc/app.py", "--port", "8000", "--host", "0.0.0.0"]