import { Elysia } from "elysia";
import { checkDeviceStatus } from "../../services/localNetwork/checkDevicePings";

function extractIp(message: unknown): string | null {
  if (typeof message === "string") {
    return message.trim() || null;
  }

  if (typeof message === "object" && message !== null) {
    const payload = message as { ip?: unknown };

    if (typeof payload.ip === "string" && payload.ip.trim()) {
      return payload.ip.trim();
    }
  }

  return null;
}

export const networkStatus = new Elysia().ws("/network/status", {
  async message(ws, message) {
    const ip = extractIp(message);

    if (!ip) {
      ws.send({
        type: "error",
        message: "Missing ip for status check",
      });
      return;
    }

    try {
      const status = await checkDeviceStatus(ip);

      ws.send({
        type: "status",
        ip,
        status,
      });
    } catch {
      ws.send({
        type: "status",
        ip,
        status: "error",
      });
    }
  },
});