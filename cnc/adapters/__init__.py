from cnc.adapters.agents_db import AgentsBase, get_agents_db, agents_engine
from cnc.adapters.data_db import DataBase, get_data_db, data_engine
from cnc.adapters.tasks_db import TasksBase, get_tasks_db, tasks_engine

dbs = [
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
    'dbs',
]
