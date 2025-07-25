from shared.adapters.db_factory import create_db_adapter

agents_engine, AgentsBase, _, get_agents_db = create_db_adapter(
    env_db_name='PG_AGENTS',
    dialect='postgresql',
    driver='asyncpg'
)
