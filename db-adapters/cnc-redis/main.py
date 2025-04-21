import redis

r = redis.Redis(host='redis', port=6379, db=0)

def get_authkey():
    return r.get("authkey")