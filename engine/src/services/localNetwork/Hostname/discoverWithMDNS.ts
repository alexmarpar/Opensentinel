import { Bonjour } from "bonjour-service";

export default function discoverMDNSDevices(ip: string): Promise<string> {
  return new Promise((resolve) => {
    const bonjour = new Bonjour();
    const browser = bonjour.find();

    let finished = false;

    const finish = (hostname: string) => {
      if (finished) return;
      finished = true;

      clearTimeout(timeout);
      browser.stop();
      bonjour.destroy();
      resolve(hostname);
    };

    browser.on("up", (service) => {
      console.log(service)
      if (service.referer?.address === ip || service.addresses?.includes(ip)) {
        finish(service.name || service.fqdn || "unknown");
      }
    });

    const timeout = setTimeout(() => finish("unknown"), 5000);
  });
}