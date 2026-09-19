/**
 * for build and read file paths
 */

import path from "node:path";

/**
 * prefer this for building path over concatenation string path
 * it does not create a folder
 * it creates a path string with the correct separator for the OS: i.e it create an address string for the file system. you will use the fs module to create a folder or file at the path address created by path.join
 */
const filePath = path.join(
  "PERN-TUTORIAL",
  "1_NODE_BASICS",
  "src",
  "01-process-object.ts", // base name of the file
);
console.log(filePath);
