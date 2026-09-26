/**
 * LIBUV
 *
 * libuv is a C library used by Node.js to help handle
 * asynchronous I/O and provide Node's event loop.
 *
 * Node.js roughly looks like:
 *
 *        Your JavaScript
 *              ↓
 *             V8
 *              ↓
 *          Node.js APIs
 *              ↓
 *            libuv
 *              ↓
 *      Operating System
 *
 *
 * V8:
 * - Executes JavaScript.
 * - Manages the call stack.
 * - Manages memory and garbage collection.
 *
 * libuv:
 * - Provides Node.js's event loop.
 * - Helps Node perform asynchronous I/O.
 * - Provides a thread pool for certain operations.
 * - Interacts with operating-system facilities.
 *
 *
 * WHY DO WE NEED LIBUV?
 *
 * Imagine Node.js had to read a large file:
 *
 * const data = fs.readFileSync("large-file.txt");
 *
 * console.log("Hello");
 *
 * readFileSync is synchronous.
 *
 * JavaScript must wait until the file has been read before:
 *
 * console.log("Hello");
 *
 * can execute.
 *
 *
 * With asynchronous I/O:
 *
 * fs.readFile("large-file.txt", (error, data) => {
 *   console.log(data);
 * });
 *
 * console.log("Hello");
 *
 *
 * Node does NOT block the JavaScript call stack waiting
 * for the file to finish reading.
 *
 * Simplified flow:
 *
 * JavaScript
 *     ↓
 * fs.readFile()
 *     ↓
 * Node.js
 *     ↓
 * libuv
 *     ↓
 * async work happens
 *
 * Meanwhile:
 *
 * JavaScript continues executing
 *     ↓
 * console.log("Hello")
 *
 *
 * When the file operation completes, its callback eventually
 * gets scheduled to run through the event loop.
 *
 *
 * --------------------------------------------------
 * LIBUV THREAD POOL
 * --------------------------------------------------
 *
 * libuv also provides a thread pool.
 *
 * Some operations cannot be handled purely through the
 * operating system's asynchronous I/O mechanisms.
 *
 * libuv can perform certain operations using worker threads.
 *
 * Examples include some:
 *
 * - file system operations
 * - DNS operations
 * - crypto operations
 * - compression operations
 *
 *
 * Simplified:
 *
 * Main JavaScript Thread
 *
 *     fs.readFile()
 *          │
 *          ↓
 *        libuv
 *          │
 *          ↓
 *    Worker Thread
 *          │
 *          │ reads file
 *          ↓
 *       finished
 *          │
 *          ↓
 *     Event Loop
 *          │
 *          ↓
 *      callback()
 *
 *
 * IMPORTANT:
 *
 * Not EVERY asynchronous operation uses the libuv thread pool.
 *
 * For example, networking can often use operating-system
 * event notification mechanisms instead of occupying a
 * worker thread while waiting.
 *
 *
 * --------------------------------------------------
 * EVENT LOOP
 * --------------------------------------------------
 *
 * The event loop is the mechanism that allows Node.js to
 * coordinate asynchronous operations.
 *
 * JavaScript executes on the main thread:
 *
 *              ┌──────────────┐
 *              │  JavaScript  │
 *              └──────┬───────┘
 *                     ↓
 *              ┌──────────────┐
 *              │      V8      │
 *              │  Call Stack  │
 *              └──────┬───────┘
 *                     │
 *              async operation
 *                     ↓
 *              ┌──────────────┐
 *              │   Node APIs  │
 *              └──────┬───────┘
 *                     ↓
 *              ┌──────────────┐
 *              │    libuv     │
 *              │              │
 *              │ Event Loop   │
 *              │ Thread Pool  │
 *              └──────┬───────┘
 *                     ↓
 *              Operating System
 *
 *
 * When asynchronous work completes, Node can eventually
 * execute the corresponding callback on the JavaScript
 * thread.
 *
 *
 * --------------------------------------------------
 * PUTTING EVERYTHING TOGETHER
 * --------------------------------------------------
 *
 * V8
 * - Understands and executes JavaScript.
 * - Manages the call stack and memory.
 *
 * Node.js APIs
 * - Give JavaScript capabilities such as:
 *
 *   fs
 *   http
 *   crypto
 *   timers
 *   etc.
 *
 * libuv
 * - Provides the event loop.
 * - Helps manage asynchronous I/O.
 * - Provides a worker thread pool.
 * - Communicates with operating-system facilities.
 *
 * Event Loop
 * - Coordinates when asynchronous callbacks get a chance
 *   to execute.
 *
 *
 * --------------------------------------------------
 * SIMPLE MENTAL MODEL
 * --------------------------------------------------
 *
 *            JavaScript Code
 *                  │
 *                  ↓
 *            ┌──────────┐
 *            │    V8    │
 *            └────┬─────┘
 *                 │
 *                 ↓
 *            Node.js APIs
 *                 │
 *                 ↓
 *            ┌──────────┐
 *            │  libuv   │
 *            ├──────────┤
 *            │Event Loop│
 *            │Threadpool│
 *            └────┬─────┘
 *                 │
 *                 ↓
 *          Operating System
 *
 *
 * --------------------------------------------------
 * SUMMARY
 * --------------------------------------------------
 *
 * V8 = executes JavaScript.
 *
 * libuv = provides Node's event loop and asynchronous I/O
 * infrastructure, including a worker thread pool for certain
 * operations.
 *
 * Event Loop = coordinates when completed asynchronous work
 * can have its callbacks executed.
 *
 * Thread Pool = worker threads used for certain operations
 * that should not block the JavaScript thread.
 *
 *
 * So when people say:
 *
 * "Node.js is single-threaded"
 *
 * they usually mean that your JavaScript code normally executes
 * on one main JavaScript thread.
 *
 * It does NOT mean the entire Node.js process only has one thread.
 *
 * Node can use libuv's worker threads and operating-system
 * facilities behind the scenes while JavaScript continues
 * running on the main thread.
 */
