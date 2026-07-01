const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Task = require('../models/task');

// Validierung importieren
const { validateTask } = require('../middleware/validate');

const dataFile = path.join(__dirname, '../../data/tasks.json');

const readTasks = () => {
    if (!fs.existsSync(dataFile)) {
        fs.writeFileSync(dataFile, JSON.stringify([]));
    }
    const rawData = fs.readFileSync(dataFile);
    return JSON.parse(rawData);
};

const writeTasks = (tasks) => {
    fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
};

router.get('/', (req, res) => {
    const { status, assignee } = req.query;
    let tasks = readTasks();
    if (status) tasks = tasks.filter(t => t.status === status);
    if (assignee) tasks = tasks.filter(t => t.assignee === assignee);
    res.json({ count: tasks.length, tasks });
});

router.get('/:id', (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ error: 'Task nicht gefunden' });
    res.json(task);
});

// HIER: validateTask als Middleware eingefügt (Vor der eigentlichen Funktion)
router.post('/', validateTask, (req, res) => {
    const tasks = readTasks();
    const newTask = Task.create(req.body);
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

// HIER: validateTask als Middleware eingefügt
router.put('/:id', validateTask, (req, res) => {
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Task nicht gefunden' });
    
    tasks[index] = { ...tasks[index], ...req.body, updatedAt: new Date().toISOString() };
    writeTasks(tasks);
    res.json(tasks[index]);
});

router.delete('/:id', (req, res) => {
    let tasks = readTasks();
    const filteredTasks = tasks.filter(t => t.id !== req.params.id);
    if (tasks.length === filteredTasks.length) return res.status(404).json({ error: 'Task nicht gefunden' });
    
    writeTasks(filteredTasks);
    res.json({ message: 'Task gelöscht' });
});

router.patch('/:id/transition', (req, res) => {
    const { id } = req.params;
    const { status: newStatus } = req.body;
    
    if (!newStatus) return res.status(400).json({ error: 'Status erforderlich' });
    
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) return res.status(404).json({ error: 'Task nicht gefunden' });
    
    tasks[taskIndex].status = newStatus;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    tasks[taskIndex].statusHistory.push({ status: newStatus, timestamp: new Date().toISOString() });
    
    writeTasks(tasks);
    res.json({ message: `Task zu '${newStatus}' übergegangen`, task: tasks[taskIndex] });
});

module.exports = router;