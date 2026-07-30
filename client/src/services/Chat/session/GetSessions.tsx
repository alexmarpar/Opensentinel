type Session = {
  title: string;
  sessionId: string;
};

async function GetSessions(): Promise<Session[]> {
  const res = await fetch("http://localhost:3000/sessions");

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const ids: string[] = await res.json();
  const sessions: Session[] = [];

  for (const id of ids) {
    try {
      const configRes = await fetch(
        `http://localhost:3000/sessions?id=${id}`
      );

      if (configRes.ok) {
        sessions.push({ title: (await configRes.json()).response, sessionId: id });
      }
    } catch (error) {
      console.error(`Error fetching session ${id}:`, error);
    }
  }

  return sessions;
}

export default GetSessions;