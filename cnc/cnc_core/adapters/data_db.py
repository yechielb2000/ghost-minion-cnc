from cnc.cnc_core.adapters.db_factory import create_db_adapter

_, _, get_data_db = create_db_adapter(env_db_name='DATA', dialect='postgresql', driver='asyncpg')
