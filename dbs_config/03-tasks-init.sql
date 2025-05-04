CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL,
    payload BYTEA NOT NULL,
    priority INTEGER NOT NULL CHECK (priority BETWEEN 1 AND 10),
    sent BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_tasks_agent_id ON tasks(agent_id);