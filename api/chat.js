export default async function handler(req, res) {
  const OPENROUTER_API_KEY = "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";
  const userMessage = req.body.text;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral/mistral-7b-instruct",
      messages: [
        { role: "system", content: "شما یک دستیار هوش مصنوعی هستید که به زبان فارسی مودب و دقیق پاسخ می‌دهد." },
        { role: "user", content: userMessage }
      ]
    }),
  });

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content || "متأسفم، نتونستم پاسخی پیدا کنم.";

  res.status(200).json({
    replies: [{ message: reply }]
  });
}
