FROM c2-services-base-image:latest

WORKDIR /app

COPY services/tasks_api/ ./services/tasks_api
COPY services/__init__.py ./services/

CMD ["uvicorn", "services.tasks_api.main:app", "--host", "0.0.0.0", "--port", "8000"]