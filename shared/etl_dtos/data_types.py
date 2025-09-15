import enum


class DataType(str, enum.Enum):
    SCREENSHOT = 'screenshot'
    KEYLOG = 'keylog'
    COMMAND = 'command'
    TELEMETRY = 'telemetry'
    FILE = 'file'
