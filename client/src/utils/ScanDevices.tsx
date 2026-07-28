import { useEffect, useState } from "react";
import GetDevices from "../components/GetDevices";

export default function ScanDevices() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/scan");

    ws.onopen = () => {
      console.log("Connected");
      ws.send("scan");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "devices") {
        setDevices(data.devices);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected");
    };

    ws.onerror = (err) => {
      console.error(err);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <GetDevices devices={devices} />
  );
}