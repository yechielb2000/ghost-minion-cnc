export const formatLastSeen = (timestamp: number): string => {
    if (timestamp < 1e11) timestamp *= 1000; // convert seconds → milliseconds

    const now = Date.now();
    const difference = Math.floor((now - timestamp) / 1000); // seconds difference

    if (difference < 0) return "just now"; // future timestamps

    const units = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "min", seconds: 60 },
        { label: "second", seconds: 1 },
    ];

    for (const unit of units) {
        const value = Math.floor(difference / unit.seconds);
        if (value >= 1) {
            return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
};