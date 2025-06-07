// pages/api/send-message.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  
  const { TELEGRAM_BOT_TOKEN } = process.env;

  if (!TELEGRAM_BOT_TOKEN) {
    return res.status(500).json({ error: "Missing TELEGRAM_BOT_TOKEN in environment variables" });
  }

  const { chat_id, text } = req.body;
  
  if (!chat_id || !text) {
    return res.status(400).json({ error: "Missing chat_id or text in request body" });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id,
        text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ message: "Message sent successfully", data });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send message", detail: error.message });
  }
}
