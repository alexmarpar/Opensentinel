async function RemoveDevice(name: string) {
  const response = await fetch(`http://localhost:3000/ssh?id=${name}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
}

export default RemoveDevice;