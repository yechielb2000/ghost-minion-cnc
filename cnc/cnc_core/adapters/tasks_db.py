from cnc.cnc_core.adapters.db_factory import create_db_adapter

_, _, get_tasks_db = create_db_adapter(env_db_name='TASKS', dialect='postgresql', driver='asyncpg')