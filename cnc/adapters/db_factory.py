import os
from typing import Any, Callable, AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncEngine, AsyncSession
from sqlalchemy.orm import declarative_base


def create_db_adapter(env_db_name: str, dialect: str, driver: str) -> tuple[
    AsyncEngine, Any, async_sessionmaker[AsyncSession], Callable[[], AsyncGenerator[AsyncSession, Any]]]:
    """
    Creates engine, sessionmaker, and dependency getter from env using the given prefix.
    Example prefix: 'PG_{DBNAME}'
    Requires env vars like: PG_{DBNAME}_DB_NAME, PG_{DBNAME}_ADRS, PG_{DBNAME}_USR, etc.
    :returns: engine, Base, session, get_db function
    """
    db_name = os.getenv(f"{env_db_name}_DB_NAME")
    address = os.getenv(f"{env_db_name}_ADRS")
    port = os.getenv(f"{env_db_name}_PRT")
    username = os.getenv(f"{env_db_name}_USR")
    password = os.getenv(f"{env_db_name}_PSWD")

    if not all([db_name, username, password]):
        raise ValueError(f"Missing database configuration for environment db name '{env_db_name}'")

    base = declarative_base()

    url = f"{dialect}+{driver}://{username}:{password}@{address}:{port}/{db_name}"
    engine = create_async_engine(url, echo=False)
    session_local = async_sessionmaker(bind=engine, expire_on_commit=False)

    async def get_db():
        async with session_local() as session:
            yield session

    return engine, base, session_local, get_db
