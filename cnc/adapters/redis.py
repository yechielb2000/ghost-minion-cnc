import os

import redis

address = os.getenv(f"REDIS_ADRS")
port = os.getenv(f"REDIS_PRT")
username = os.getenv(f"REDIS_USR")
password = os.getenv(f"REDIS_PSWD")


def get_redis():
    return redis.Redis(
        host=address,
        port=port,
        username=username,
        password=password,
        decode_responses=True,
        db=0
    )
