import os

import redis
from fastapi import FastAPI
from fastapi import Request
from redis.asyncio import Redis


def get_redis(request: Request) -> Redis:
    return request.app.state.redis


async def create_redis_connection(app: FastAPI):
    host = os.getenv("CNC_REDIS_HOST")
    port = int(os.getenv("CNC_REDIS_PORT"))
    password = os.getenv("CNC_REDIS_PASSWORD")

    app.state.redis = redis.Redis(
        host=host,
        port=port,
        password=password,
        decode_responses=True
    )
