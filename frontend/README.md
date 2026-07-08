# Agile PM — Frontend

Dieses Verzeichnis enthält ein kleines React + Vite Frontend für das Agile PM Projekt.

Schnellstart (lokal):

1. Kopieren Sie `.env.example` nach `.env` und passen Sie `VITE_API_BASE_URL` an, z.B.: `VITE_API_BASE_URL=http://localhost:3000`
2. Installieren:
   npm install
3. Entwicklung starten:
   npm run dev

Build/Produktion:

1. Build erstellen: npm run build
2. Docker-Image bauen: docker build -t agile-pm-frontend:latest .

Annahmen:
- Das Backend stellt REST-Endpoints unter `${VITE_API_BASE_URL}/tasks` zur Verfügung (GET, POST, PUT, DELETE).

Wenn Sie möchten, öffne ich nach dem Testen einen Pull Request von feature/frontend in main und füge ein kurzes Testskript hinzu.
