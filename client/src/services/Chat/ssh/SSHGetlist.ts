type Session = {
  name: string;
  host: string;
  port: number;
  username: string;
};
async function SSHGetlist() {
  const res = await fetch("http://localhost:3000/ssh");

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const sshsessions: Session[] = await res.json();

  const results = [];

  for (const session of sshsessions) {
    const response = await fetch(
      `http://localhost:3000/ssh?id=${session}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    results.push({name: session, ...data});
  }

  return results;
}

export default SSHGetlist;