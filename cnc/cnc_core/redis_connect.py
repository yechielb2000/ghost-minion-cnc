import os

from fastapi import Request
from redis.asyncio import Redis


def get_redis(request: Request) -> Redis:
    return request.app.state.redis


def create_redis_connection():
    host = os.getenv("CNC_REDIS_HOST")
    port = int(os.getenv("CNC_REDIS_PORT"))
    password = os.getenv("CNC_REDIS_PASSWORD")
    return Redis(
        host=host,
        port=port,
        password=password,
        decode_responses=True
    )
