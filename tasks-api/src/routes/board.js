const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { calculateCycleTime, calculateLeadTime, calculateThroughput, calculateAverage } = require('../utils/metrics');

const dataFile = path.join(__dirname, '../../data/tasks.json');
const readTasks = () => JSON.parse(fs.readFileSync(dataFile));

// GET /api/board
router.get('/', (req, res) => {
    const tasks = readTasks();
    const board = {};
    const statuses = ['backlog', 'todo', 'in_progress', 'review', 'testing', 'done'];
    
    statuses.forEach(s => {
        board[s] = tasks.filter(t => t.status === s);
    });
    
    const counts = {};
    statuses.forEach(s => counts[s] = board[s].length);
    
    res.json({ board, counts });
});

// GET /api/board/metrics
router.get('/metrics', (req, res) => {
    const tasks = readTasks();
    
    const metrics = {
        averageCycleTime: calculateAverage(tasks.map(calculateCycleTime)),
        averageLeadTime: calculateAverage(tasks.map(calculateLeadTime)),
        throughput: calculateThroughput(tasks),
        wip: tasks.filter(t => ['in_progress', 'review', 'testing'].includes(t.status)).length
    };
    
    res.json({
        timestamp: new Date().toISOString(),
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.status === 'done').length,
        metrics: metrics
    });
});

module.exports = router;