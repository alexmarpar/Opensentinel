export async function GetSessionName( sessionId: string): Promise<string> {
  const res = await fetch(`http://localhost:3000/sessions?id=${sessionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error sending message");
  }
  const data = await res.json();
  return data.response
}