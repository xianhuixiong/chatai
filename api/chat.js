// Vercel Serverless Function: Non-streaming chat
// POST /api/chat  { model?: string, messages: Array<{role:string, content:string}> }
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { messages = [], model = "deepseek-chat" } = body;

    const upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY || ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, messages, stream: false }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      return res.status(upstream.status).json({ error: `Upstream error: ${text}` });
    }
    const data = await upstream.json();
    return res.status(200).json({
      reply: data?.choices?.[0]?.message?.content ?? "",
      usage: data?.usage,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "DeepSeek error" });
  }
};
