const { getVendor } = require("mac-oui-lookup");

export default function getVendorFunc(macAddress: string) {
    const vendor = getVendor(macAddress);
    if (vendor) {
        return vendor;
    }
    return "Unknown";
}
