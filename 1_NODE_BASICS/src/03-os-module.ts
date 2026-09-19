import * as os from "node:os";

console.log("OS", os.platform());
console.log("architecture", os.arch());
console.log("total memory", os.totalmem());
console.log("free memory", os.freemem());
console.log("hostname", os.hostname());
console.log("uptime", os.uptime());
console.log("user info", os.userInfo());
console.log("os type", os.type());

const cpus = os.cpus();
console.log("CPU count", cpus.length);
console.log("CPU model", cpus[0]?.model);
console.log("CPU speed", cpus[0]?.speed);
