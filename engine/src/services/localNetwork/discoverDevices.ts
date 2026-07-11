import find from "local-devices";
import getVendorFunc from "./getVendor";
import { reverse } from "node:dns/promises";
import discoverMDNSDevices from "./Hostname/discoverWithMDNS";

export type DiscoveredDevice = {
  ip: string;
  mac: string;
  name: string;
  vendor: string;
  hostname: string;
  status: "pending";
};

async function getHostname(ip: string): Promise<string> {
  try {
    const hostnames = await reverse(ip);
    return hostnames[0] || "unknown";
  } catch {
    try {
      return await discoverMDNSDevices(ip);
    } catch {
      return "unknown";
    }
    
  }
}

export async function discoverDevices(): Promise<DiscoveredDevice[]> {
  const devices = await find();

  return Promise.all(
    devices.map(async (device) => ({
      ...device,
      hostname: await getHostname(device.ip),
      vendor: getVendorFunc(device.mac),
      status: "pending",
    }))
  );
}