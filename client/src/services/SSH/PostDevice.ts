type AddDeviceBody = {
  name: string;
  host: string;
  port: number;
  username: string;
};

async function PostDevice(device: AddDeviceBody) {
  const response = await fetch("http://localhost:3000/ssh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(device),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json();
}

export default PostDevice;