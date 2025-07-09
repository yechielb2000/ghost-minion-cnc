from uuid import UUID

from fastapi import APIRouter, Depends, status

from services.agent_crud.controller import AgentController, get_agent_controller
from shared.schemas.agent import AgentCreate, AgentRead

router = APIRouter(prefix="/agents", tags=["Agents"])


@router.put("/", response_model=AgentRead)
def upsert_agent(agent: AgentCreate, service: AgentController = Depends(get_agent_controller)):
    return service.upsert_agent(agent)


@router.get("/{agent_id}", response_model=AgentRead)
def get_agent(agent_id: UUID, service: AgentController = Depends(get_agent_controller)):
    return service.get_agent(agent_id)


@router.delete("/{agent_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_agent(agent_id: UUID, service: AgentController = Depends(get_agent_controller)):
    service.delete_agent(agent_id)
