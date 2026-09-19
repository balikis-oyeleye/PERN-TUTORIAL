/**
 * built in node js module
 * It is used for
 * - security related tasks
 * - creating random UUIDs
 * - hashing data
 * - to verify if the data has been tampered with
 * - to encrypt and decrypt data
 */

import crypto from "node:crypto";

console.log(crypto.randomUUID()); // generates a random UUID
console.log(crypto.randomBytes(16).toString("hex")); // generates 16 random bytes

const data = "Hello World";
const hash = crypto.createHash("sha256").update(data).digest("hex");

console.log(hash);

// hmac - signed hash message authentication code
const hmac = crypto.createHmac("sha256", "secret").update(data).digest("hex");
console.log(hmac);
