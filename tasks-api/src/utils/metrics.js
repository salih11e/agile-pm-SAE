function calculateCycleTime(task) {
    if (task.status !== 'done') return null;
    if (!task.startedAt || !task.completedAt) return null;
    
    const startTime = new Date(task.startedAt).getTime();
    const endTime = new Date(task.completedAt).getTime();
    return (endTime - startTime) / (1000 * 60 * 60); // Stunden
}

function calculateLeadTime(task) {
    if (task.status !== 'done') return null;
    
    const startTime = new Date(task.createdAt).getTime();
    const endTime = new Date(task.completedAt).getTime();
    return (endTime - startTime) / (1000 * 60 * 60); // Stunden
}

function calculateThroughput(tasks, periodDays = 7) {
    const now = new Date().getTime();
    const cutoff = now - (periodDays * 24 * 60 * 60 * 1000);
    
    return tasks.filter(t => {
        return t.status === 'done' && new Date(t.completedAt) >= cutoff;
    }).length;
}

// Hilfsfunktion für den Durchschnitt (aus dem Arbeitsblatt abgeleitet)
function calculateAverage(arr) {
    const validNumbers = arr.filter(n => n !== null);
    if (validNumbers.length === 0) return 0;
    return validNumbers.reduce((a, b) => a + b, 0) / validNumbers.length;
}

module.exports = { calculateCycleTime, calculateLeadTime, calculateThroughput, calculateAverage };