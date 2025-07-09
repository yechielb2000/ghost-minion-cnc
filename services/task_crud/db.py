from shared.adapters.db_factory import create_db_adapter

tasks_engine, TasksBase, _, get_tasks_db = create_db_adapter(
    env_db_name='PG_TASKS',
    dialect='postgresql',
    driver='asyncpg'
)
