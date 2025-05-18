import datetime
from typing import Optional

from fastapi import Depends
from sqlalchemy import select, update
from sqlalchemy.orm import Session

from cnc import models
from shared.adapters.agents_db import get_agents_db


class AgentController:
    def __init__(self, agents_db: Session):
        self.agents_db = agents_db

    def get_agent(self, agent_id: str) -> Optional[models.Agent]:
        stmt = select(models.Agent).where(models.Agent.id == agent_id)
        agent = self.agents_db.execute(stmt).one_or_none()
        return agent

    def update_agent_last_seen(self, agent_id: str) -> None:
        updated_last_seen_field = dict(last_seen=datetime.datetime.now(tz=datetime.UTC))
        stmt = update(models.Agent).where(models.Agent.id == agent_id).values(**updated_last_seen_field)
        self.agents_db.execute(stmt)
        self.agents_db.commit()

    def confirm_challenge(self, agent_id: str, challenge_key: str) -> bool:
        stmt = select(models.Agent).where(models.Agent.id == agent_id, models.Agent.challenge_key == challenge_key)
        agent = self.agents_db.execute(stmt).one_or_none()
        return bool(agent)

    def update_not_alive(self, agent_id: str) -> None:
        stmt = update(models.Agent).where(models.Agent.id == agent_id).values(is_alive=False)
        self.agents_db.execute(stmt)
        self.agents_db.commit()


def get_agent_controller(agents_db=Depends(get_agents_db)):
    return AgentController(agents_db)
