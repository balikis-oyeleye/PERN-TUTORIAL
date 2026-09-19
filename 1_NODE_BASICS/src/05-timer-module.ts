// Timers module: setTimeout, clearTimeout, setInterval, clearInterval and setImmediate

// clearTimeout() doesn't undo a callback that has already executed. Its purpose is to cancel a pending timeout.

const runSetTimeout = () => {
  console.log("--start--");

  setTimeout(() => {
    console.log("setTimeout");
  }, 1000);

  console.log("--end--");
};

const runSetInterval = () => {
  let count = 0;
  console.log("--start--");

  const interval = setInterval(() => {
    count++;
    console.log(count);

    if (count === 5) {
      clearInterval(interval);
    }
  }, 1000);

  console.log("--end--");
};

const runSetImmediate = () => {
  console.log("--start--");
  setImmediate(() => {
    console.log("setImmediate");
  });
  console.log("--end--");
};

runSetTimeout();
runSetInterval();
runSetImmediate();

// | `setTimeout(fn, 1000)`  | Run `fn` **once**, after at least ~1 second                       |
// | `setInterval(fn, 1000)` | Run `fn` **repeatedly**, roughly every 1 second                   |
// | `setImmediate(fn)`      | Run `fn` **once**, asynchronously in the event loop's check phase |
