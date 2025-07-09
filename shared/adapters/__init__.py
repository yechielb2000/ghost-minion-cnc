from services.agent_crud.db import AgentsBase, get_agents_db, agents_engine
from shared.adapters.data_db import DataBase, get_data_db, data_engine
from shared.adapters.mq.kafka import get_kafka_producer, flush_producer
from shared.adapters.redis import get_redis
from shared.adapters.tasks_db import TasksBase, get_tasks_db, tasks_engine

pg_dbs = [
    (DataBase, data_engine),
    (AgentsBase, agents_engine),
    (TasksBase, tasks_engine),
]

__all__ = [
    'AgentsBase',
    'TasksBase',
    'DataBase',
    'get_agents_db',
    'get_data_db',
    'get_tasks_db',
    'data_engine',
    'tasks_engine',
    'agents_engine',
    'get_redis',
    'get_kafka_producer',
    'flush_producer',
    'pg_dbs',
]
