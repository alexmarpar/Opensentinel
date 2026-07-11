import { Elysia } from "elysia";
import { discoverDevices } from "../services/localNetwork/discoverDevices";

export const scan = new Elysia().ws("/scan", {
  async message(ws, message) {
    if (message !== "scan") {
      return;
    }

    const devices = await discoverDevices();

    ws.send({
      type: "devices",
      devices,
    });
  },
});

// Frontend'll send a "scan" message to this WebSocket endpoint to trigger the device discovery process. The server will respond with a list of discovered devices.