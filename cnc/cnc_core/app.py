from fastapi import FastAPI

from cnc.cnc_core.routers.agent import agent_router

app = FastAPI()

app.include_router(agent_router)
