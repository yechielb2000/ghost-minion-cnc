from http import HTTPStatus
from typing import Optional
from uuid import UUID

import requests


class AgentSDK:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip('/')

    def upsert_agent(self, agent_data: dict) -> dict:
        """
        Upsert an agent by sending a PUT /agents request.
        agent_data must include the 'id' field (UUID as str).
        """
        url = f"{self.base_url}/agents"
        resp = requests.put(url, json=agent_data)
        resp.raise_for_status()
        return resp.json()

    def get_agent(self, agent_id: UUID) -> Optional[dict]:
        """
        Get agent info by ID.
        Returns dict if found, else None.
        """
        url = f"{self.base_url}/agents/{agent_id}"
        resp = requests.get(url)
        if resp.status_code == HTTPStatus.NOT_FOUND:
            return None
        resp.raise_for_status()
        return resp.json()

    def delete_agent(self, agent_id: UUID) -> bool:
        """
        Delete agent by ID.
        Returns True if deleted, False if not found.
        """
        url = f"{self.base_url}/agents/{agent_id}"
        resp = requests.delete(url)
        if resp.status_code == 404:
            return False
        resp.raise_for_status()
        return True
