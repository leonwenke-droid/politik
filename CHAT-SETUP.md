# KI-Chat für alle Besucher einrichten (Vercel)

Damit jeder, der deine Website besucht, den KI-Chat nutzen kann, brauchst du ein kleines Backend auf Vercel. Die Besucher sehen den API-Key nie.

**Wichtig:** Den API-Key nur in Vercel Environment Variables speichern – nicht im Quellcode oder in `index.html`.

---

## Schritte

1. **Projekt bei Vercel deployen**
   - Auf [vercel.com](https://vercel.com) anmelden, mit GitHub verbinden.
   - Dieses Projekt (oder den Ordner) importieren und deployen.

2. **API-Key eintragen**
   - Vercel Dashboard → dein Projekt → **Settings** → **Environment Variables**
   - Name: `OPENAI_API_KEY`  
   - Value: dein OpenAI-Key (z. B. `sk-...`) dort einfügen.
   - Für **Production** (und ggf. Preview) aktivieren → Speichern.

3. **Redeploy**
   - **Deployments** → beim letzten Deployment auf die drei Punkte → **Redeploy**, damit die Variable geladen wird.

4. **URL in der Lernapp eintragen**
   - In `index.html` die Zeile mit `CHATBOT_API_URL` finden.
   - Statt `''` die URL eintragen, z. B.:  
     `https://dein-projekt-name.vercel.app/api/chat`  
     (Die genaue URL steht im Vercel Dashboard unter **Deployments** → Domain.)

5. **Fertig** – Jeder Besucher nutzt automatisch den KI-Chat; der Key bleibt auf dem Vercel-Server.

---

## Hinweise

- Kosten entstehen bei OpenAI pro Nutzung; das kostenlose Vercel-Kontingent reicht für das Backend, die API-Kosten fallen bei OpenAI an.
