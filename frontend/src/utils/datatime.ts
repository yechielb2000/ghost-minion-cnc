const getHumanReadableDate = (timestamp: number | null) => {
    if (!timestamp) return 'Any';
    return new Date(timestamp).toLocaleString();
};