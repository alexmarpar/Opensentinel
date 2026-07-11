var ping = require('ping');

export async function checkDeviceStatus(ip: string) {
    let res = await ping.promise.probe(ip);
    if (res.alive) {
        return "accepts pings"
    }
    return "denies pings"
}