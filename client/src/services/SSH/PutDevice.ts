

async function PutDevice(id: string, newid: string) {
  const res = await fetch(`http://localhost:3000/ssh?id=${id}&newid=${newid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, newid }),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return await res.json();
}

export default PutDevice;