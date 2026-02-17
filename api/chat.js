/**
 * Chat-Backend für die PoWi-Lernapp (Vercel Serverless).
 * API-Key nur in Vercel: Dashboard → Settings → Environment Variables → OPENAI_API_KEY setzen, danach Redeploy.
 * In index.html CHATBOT_API_URL auf die Vercel-API-URL setzen (z. B. https://dein-projekt.vercel.app/api/chat).
 * Siehe CHAT-SETUP.md für die vollständige Anleitung.
 */

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key || !key.startsWith('sk-')) {
    return res.status(500).json({ error: 'OPENAI_API_KEY nicht gesetzt (Vercel: Settings → Environment Variables)' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: 'Ungültiges JSON' });
  }

  const messages = body.messages || [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages[] erforderlich' });
  }

  const payload = {
    model: body.model || 'gpt-4o-mini',
    messages,
    max_tokens: 800,
  };

  try {
    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      const err = data.error?.message || response.statusText;
      return res.status(response.status).json({ error: err });
    }

    const content = data.choices?.[0]?.message?.content;
    if (content == null) {
      return res.status(502).json({ error: 'Keine Antwort von OpenAI' });
    }

    return res.status(200).json({ choices: [{ message: { role: 'assistant', content } }] });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: 'Backend-Fehler: ' + (err.message || 'Unbekannt') });
  }
}
