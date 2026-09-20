/**
 * buffer: raw binary data
 *
 * used for:
 * - receiving http req bodies
 * - working with streams
 * - handling images, pdf files, videos
 * encrypt and hashing
 */

const textBuffer = Buffer.from("Node");
console.log(textBuffer.toString("utf-8"));

const engBuffer = Buffer.from("Hello");
console.log(engBuffer.length);

// create empty buffer
const fixBuffer = Buffer.alloc(5);
console.log(fixBuffer);

const chunks = [Buffer.from("Hello"), Buffer.from("World")];

const combinedBuffer = Buffer.concat(chunks);
console.log(combinedBuffer.toString("utf-8"));
