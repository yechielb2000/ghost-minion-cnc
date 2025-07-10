import os
from typing import Optional

from redis.asyncio import Redis

address = os.getenv("REDIS_ADRS")
port = int(os.getenv("REDIS_PRT"))
username = os.getenv("REDIS_USR")
password = os.getenv("REDIS_PSWD")

redis_client: Optional[Redis] = None


async def get_redis() -> Redis:
    global redis_client
    if redis_client is None:
        redis_client = Redis(
            host=address,
            port=port,
            username=username,
            password=password,
            decode_responses=True,
            db=0
        )
    return redis_client
