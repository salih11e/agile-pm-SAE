document.addEventListener('DOMContentLoaded', () => {
    // 1. Beim Start alle Karten vom Backend laden
    fetchCards();

    // 2. Drop-Events für die Spalten (Container) einrichten
    const containers = document.querySelectorAll('.card-container');
    
    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault(); // Erlaubt das Droppen
            const draggable = document.querySelector('.dragging');
            if (draggable) container.appendChild(draggable);
        });

        container.addEventListener('drop', async e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            const newStatus = container.getAttribute('data-status');
            const cardId = draggable.id.replace('card-', ''); 
            
            // 3. Backend über die Verschiebung informieren (nutzt deine /transition Route!)
            try {
                const response = await fetch(`/api/tasks/${cardId}/transition`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus })
                });
                
                if (response.ok) {
                    console.log(`Erfolg: Task ${cardId} ist jetzt in '${newStatus}'`);
                } else {
                    console.error('Fehler beim Aktualisieren der Karte im Backend');
                }
            } catch (error) {
                console.error('Netzwerkfehler:', error);
            }
        });
    });
});

// Hilfsfunktion: Karten vom Server abfragen und im HTML platzieren
async function fetchCards() {
    try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        const tasks = data.tasks; // Hier greifen wir auf das Array in deiner JSON-Antwort zu
        
        // Zuerst alle Container leeren
        document.querySelectorAll('.card-container').forEach(c => c.innerHTML = '');

        // Jede Karte in die entsprechende Spalte packen
        tasks.forEach(task => {
            const container = document.getElementById(task.status);
            if (container) {
                const cardElement = createCardElement(task);
                container.appendChild(cardElement);
            }
        });
    } catch (error) {
        console.error('Fehler beim Laden der Karten:', error);
    }
}

// Hilfsfunktion: Baut das HTML für eine einzelne Karte
function createCardElement(task) {
    const div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('draggable', 'true');
    div.id = `card-${task.id}`;
    
    // Nutzt task.title und task.description, wie in deinem Backend-Modell vorgesehen
    div.innerHTML = `
        <h3>${task.title || 'Ohne Titel'}</h3>
        <p>${task.description || ''}</p>
    `;

    // Drag-Events für jede erstellte Karte hinzufügen
    div.addEventListener('dragstart', () => div.classList.add('dragging'));
    div.addEventListener('dragend', () => div.classList.remove('dragging'));

    return div;
}