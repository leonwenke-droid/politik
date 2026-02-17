# KI-Chat für alle Besucher einrichten

Damit jeder, der deine Website besucht, den KI-Chat nutzen kann, brauchst du **ein kleines Backend**, in dem nur dein API-Key liegt. Die Besucher sehen den Key nie.

**Wichtig:** Den API-Key (z. B. `sk-...`) **niemals** im Quellcode oder in `index.html` eintragen. Nur in Vercel Environment Variables oder lokal in `.env` (diese Datei steht in `.gitignore` und wird nicht ins Repo committed).

---

## Vercel (für alle Besucher)

1. **Projekt bei Vercel deployen**
   - Auf [vercel.com](https://vercel.com) anmelden, mit GitHub verbinden.
   - Dieses Projekt (oder den Ordner) importieren und deployen.

2. **API-Key eintragen**
   - Vercel Dashboard → dein Projekt → **Settings** → **Environment Variables**
   - Name: `OPENAI_API_KEY`  
   - Value: dein OpenAI-Key (z. B. `sk-...`) dort einfügen.
   - Für **Production** (und ggf. Preview) aktivieren → Speichern.

3. **Redeploy**
   - **Deployments** → beim letzten Deployment auf die drei Punkte → **Redeploy**, damit die Variable geladen wird.

4. **URL in der Lernapp eintragen**
   - In `index.html` die Zeile mit `CHATBOT_API_URL` finden.
   - Statt `''` die URL eintragen, z. B.:  
     `https://dein-projekt-name.vercel.app/api/chat`  
     (Die genaue URL steht im Vercel Dashboard unter **Deployments** → Domain.)

5. **Fertig** – Jeder Besucher nutzt automatisch den KI-Chat; der Key bleibt auf dem Vercel-Server.

---

## Lokal testen

1. **`.env` anlegen**
   - `.env.example` als Vorlage kopieren: z. B. `cp .env.example .env`
   - In `.env` die Zeile `OPENAI_API_KEY=sk-...` mit deinem echten Key ergänzen.

2. **Backend starten**
   - Z. B. mit Vercel CLI: `npx vercel dev` (im Projektordner). Die API liegt dann unter `http://localhost:3000/api/chat`.

3. **In der App**
   - Für Tests in `index.html` vorübergehend `CHATBOT_API_URL = 'http://localhost:3000/api/chat'` eintragen (oder die URL im Chat unter „API konfigurieren“ eingeben).

---

## Hinweise

- Der Key steht **nur** in Vercel Environment Variables oder in lokaler `.env`, **nicht** im Quellcode oder in der `index.html`.
- Kosten entstehen bei OpenAI pro Nutzung; das kostenlose Vercel-Kontingent reicht für das Backend, die API-Kosten fallen bei OpenAI an.
