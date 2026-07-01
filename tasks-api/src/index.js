const express = require('express');
const cors = require('cors');

// Routen importieren
const tasksRouter = require('./routes/tasks');
const boardRouter = require('./routes/board');

// Error-Handler importieren
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routen aktivieren
app.use('/api/tasks', tasksRouter);
app.use('/api/board', boardRouter); // HIER ist die neue Board-Route

app.get('/', (req, res) => {
    res.json({ name: 'Tasks-API', version: '1.0.0' });
});

// WICHTIG: Der Error-Handler MUSS als letztes Middleware stehen!
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});