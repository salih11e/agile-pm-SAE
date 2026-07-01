const { v4: uuidv4 } = require('uuid');

function create(data) {
    return {
        id: uuidv4(),
        title: data.title,
        description: data.description || '',
        status: 'backlog', // backlog, todo, in_progress, review, testing, done
        priority: data.priority || 'medium',
        assignee: data.assignee || null,
        tags: data.tags || [],
        storyPoints: data.storyPoints || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        startedAt: null,
        completedAt: null,
        statusHistory: [{ status: 'backlog', timestamp: new Date().toISOString() }]
    };
}

module.exports = { create };