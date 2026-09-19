/**
 * fs - File System
 *
 * Used for working with files and directories:
 * - creating
 * - reading
 * - updating/writing
 * - deleting
 *
 * Synchronous API:
 * - Blocks execution until the file operation is complete.
 * - Useful for simple scripts, startup/configuration tasks,
 *   or when you intentionally need operations to happen sequentially.
 * - Usually avoid it in servers because it blocks the event loop.
 *
 * Asynchronous API:
 * - Does not block the event loop while waiting for file operations.
 * - Preferred for servers and applications handling multiple operations/users.
 * - Use when other work should be able to continue while waiting for file I/O.
 */

import path from "node:path";
import fs from "node:fs";

const FOLDER_PATH = path.join(process.cwd(), "file-system", "fs-demo");

const SYNC_FILE_PATH = path.join(FOLDER_PATH, "file.txt");
const PROMISE_FILE_PATH = path.join(FOLDER_PATH, "promise-file.txt");

const runSyncFileExample = () => {
  if (!fs.existsSync(FOLDER_PATH)) {
    fs.mkdirSync(FOLDER_PATH, { recursive: true });
  }

  // Create/write the file
  fs.writeFileSync(SYNC_FILE_PATH, "Hello World!", "utf-8");

  // Add content to the file
  fs.appendFileSync(SYNC_FILE_PATH, " Appended content", "utf-8");

  // Read the file
  const data = fs.readFileSync(SYNC_FILE_PATH, "utf-8");

  return {
    style: "sync",
    data,
    fileName: path.basename(SYNC_FILE_PATH),
    size: fs.statSync(SYNC_FILE_PATH).size,
    fileExtension: path.extname(SYNC_FILE_PATH),
  };
};

const runAsyncFileExample = () => {
  return new Promise<string>((resolve, reject) => {
    fs.writeFile(PROMISE_FILE_PATH, "Hello from async!", "utf-8", (err) => {
      if (err) {
        reject(err);
        return;
      }

      fs.readFile(PROMISE_FILE_PATH, "utf-8", (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data);
      });
    });
  });
};

console.log(runSyncFileExample());
runAsyncFileExample().then((data) =>
  console.log({
    style: "async",
    data,
    fileName: path.basename(PROMISE_FILE_PATH),
    size: fs.statSync(PROMISE_FILE_PATH).size,
    fileExtension: path.extname(PROMISE_FILE_PATH),
  }),
);
