CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL,
    task_id UUID NOT NULL,
    data BYTEA NOT NULL,
    data_type TEXT NOT NULL,
    collected_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    stored_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_data_agent_id ON data(agent_id);
CREATE INDEX IF NOT EXISTS idx_data_task_id ON data(task_id);
CREATE INDEX IF NOT EXISTS idx_data_type ON data(data_type);