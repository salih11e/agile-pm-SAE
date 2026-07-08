const express = require('express');
const cors = require('cors');
const path = require('path'); // NEU: Wichtig für die Dateipfade des Frontends

// Routen importieren
const tasksRouter = require('./routes/tasks');
const boardRouter = require('./routes/board');

// Error-Handler importieren
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// NEU: Statische Dateien (HTML, CSS, JS) aus dem "public"-Ordner ausliefern
app.use(express.static(path.join(__dirname, '../public')));

// Routen aktivieren
app.use('/api/tasks', tasksRouter);
app.use('/api/board', boardRouter); // hier ist die neue Board-Route

// Diese Route bleibt als Fallback / API-Check
app.get('/api', (req, res) => {
    res.json({ name: 'Tasks-API', version: '1.0.0' });
});

// Der Error-Handler MUSS als letztes Middleware stehen
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});