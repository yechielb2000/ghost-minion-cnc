import os

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base

Base = declarative_base()


def create_db_adapter(env_db_name: str, dialect: str, driver: str):
    """
    Creates engine, sessionmaker, and dependency getter from env using the given prefix.
    Example prefix: 'PG_{DBNAME}'
    Requires env vars like: PG_{DBNAME}_DB_NAME, PG_{DBNAME}_ADRS, PG_{DBNAME}_USR, etc.
    """
    db_name = os.getenv(f"{env_db_name}_DB_NAME")
    address = os.getenv(f"{env_db_name}_ADRS")
    port = os.getenv(f"{env_db_name}_PRT")
    username = os.getenv(f"{env_db_name}_USR")
    password = os.getenv(f"{env_db_name}_PSWD")

    if not all([db_name, username, password]):
        raise ValueError(f"Missing database configuration for environment db name '{env_db_name}'")

    url = f"{dialect}+{driver}://{username}:{password}@{address}:{port}/{db_name}"
    engine = create_async_engine(url, echo=False)
    session_local = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

    async def get_db():
        async with session_local() as session:
            try:
                yield session
            finally:
                session.close()

    return engine, session_local, get_db
