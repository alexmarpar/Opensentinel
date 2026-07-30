export async function sendMessage( provider: string, message: string, model: string,  sessionId?: string): Promise<{ response: string; sessionId: string }> {
  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      provider,
      message,
      model,
      sessionId
    }),
  });

  if (!res.ok) {
    throw new Error("Error sending message");
  }
  const data = await res.json();
  return data
}