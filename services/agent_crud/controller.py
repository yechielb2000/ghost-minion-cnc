import datetime
from typing import Optional
from uuid import UUID

from fastapi import Depends
from sqlalchemy import select, update
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.orm import Session

from services.agent_crud.db import get_agents_db
from shared.models.agent import AgentModel
from shared.schemas.agent import AgentCreate


class AgentController:
    def __init__(self, agents_db: Session):
        self.agents_db = agents_db

    def upsert_agent(self, agent: AgentCreate) -> None:
        data = agent.model_dump(exclude_unset=True, exclude_none=True)

        stmt = pg_insert(AgentModel).values(**data)

        update_fields = {
            key: getattr(stmt.excluded, key) for key in data.keys() if key not in {"id", "first_seen"}
        }

        stmt = stmt.on_conflict_do_update(index_elements=["id"], set_=update_fields)

        self.agents_db.execute(stmt)
        self.agents_db.commit()

    def get_agent(self, agent_id: UUID) -> Optional[AgentModel]:
        stmt = select(AgentModel).where(AgentModel.id == agent_id)
        agent = self.agents_db.execute(stmt).one_or_none()
        return agent

    def update_agent_last_seen(self, agent_id: str) -> None:
        updated_last_seen_field = dict(last_seen=datetime.datetime.now(tz=datetime.UTC))
        stmt = update(AgentModel).where(AgentModel.id == agent_id).values(**updated_last_seen_field)
        self.agents_db.execute(stmt)
        self.agents_db.commit()

    def confirm_challenge(self, agent_id: str, challenge_key: str) -> bool:
        stmt = select(AgentModel).where(AgentModel.id == agent_id, AgentModel.challenge_key == challenge_key)
        agent = self.agents_db.execute(stmt).one_or_none()
        return bool(agent)

    def update_not_alive(self, agent_id: str) -> None:
        stmt = update(AgentModel).where(AgentModel.id == agent_id).values(is_alive=False)
        self.agents_db.execute(stmt)
        self.agents_db.commit()

    def delete_agent(self, agent_id: UUID) -> None:
        agent = self.agents_db.get(AgentModel, agent_id)
        if not agent:
            raise ValueError("Agent not found")
        self.agents_db.delete(agent)
        self.agents_db.commit()


def get_agent_controller(agents_db=Depends(get_agents_db)):
    return AgentController(agents_db)
