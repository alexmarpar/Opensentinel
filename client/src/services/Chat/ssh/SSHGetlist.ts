type SSHDevice = {
  name: string;
  host: string;
  port: number;
  username: string;
};

async function SSHGetlist(): Promise<SSHDevice[]> {
  const res = await fetch("http://localhost:3000/ssh");

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const sshNames: string[] = await res.json();
  const results: SSHDevice[] = [];

  for (const name of sshNames) {
    const response = await fetch(
      `http://localhost:3000/ssh?id=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      continue;
    }

    const data = await response.json();
    results.push({ name, ...data });
  }

  return results;
}

export default SSHGetlist;
