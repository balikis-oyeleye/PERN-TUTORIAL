/**
 * Streams
 *
 * Streams allow Node.js to process data piece by piece (in chunks)
 * instead of loading all of the data into memory at once.
 *
 * Streams are useful when working with large amounts of data,
 * such as:
 * - large files
 * - videos
 * - uploads/downloads
 * - HTTP requests and responses
 *
 * Types of streams:
 *
 * 1. Readable
 *    - Data comes OUT of the stream.
 *    - Example: reading a large file.
 *
 * 2. Writable
 *    - Data goes INTO the stream.
 *    - Example: writing data to a file.
 *
 * 3. Duplex
 *    - Data can come IN and go OUT.
 *    - Example: a network socket.
 *
 * 4. Transform
 *    - A special Duplex stream that modifies data
 *      as it passes through.
 *    - Example: compressing a file.
 */

import { Readable, Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

const readableStream = Readable.from(["hello", "from", "a", "stream"]);

const uppercaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const text = chunk.toString().toUpperCase();
    callback(null, text);
  },
});

const writableStream = new Writable({
  write(chunk, encoding, callback) {
    console.log("received chunk", chunk.toString());
    callback();
  },
});

async function main(): Promise<void> {
  try {
    await pipeline(readableStream, uppercaseTransform, writableStream);
  } catch (error) {
    const err = error instanceof Error ? error.message : "Unknown error";

    console.error("An error occurred:", err);
  }
}

main();
