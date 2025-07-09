from asyncio import Lock
from config import DATA_RECEIVERS, TASKS_PROVIDERS


# Global round-robin state
task_rr_index = 0
data_rr_index = 0

# Locks to protect index changes
task_rr_lock = Lock()
data_rr_lock = Lock()

async def get_next_task_upstream():
    global task_rr_index
    async with task_rr_lock:
        url = TASKS_PROVIDERS[task_rr_index % len(TASKS_PROVIDERS)]
        task_rr_index += 1
        return url

async def get_next_data_upstream():
    global data_rr_index
    async with data_rr_lock:
        url = DATA_RECEIVERS[data_rr_index % len(DATA_RECEIVERS)]
        data_rr_index += 1
        return url
