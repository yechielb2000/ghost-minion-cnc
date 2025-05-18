from shared.adapters.db_factory import create_db_adapter

data_engine, DataBase, _, get_data_db = create_db_adapter(env_db_name='PG_DATA', dialect='postgresql', driver='asyncpg')
