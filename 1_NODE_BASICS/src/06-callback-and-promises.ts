/**
 * Callbacks and Promises
 *
 * Callbacks are functions that are passed as arguments to other functions and are executed when the other function is done.
 * Promises are objects that represent the result of an asynchronous operation.
 */

type USER = {
  id: number;
  name: string;
  role: "user" | "super-admin";
};

const users: USER[] = [
  {
    id: 1,
    name: "John Doe",
    role: "user",
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "super-admin",
  },
];

const findUserWithCallback = (id: number, callback: (user: USER) => void) => {
  const user = users.find((user) => user.id === id);
  if (user) {
    callback(user);
  } else {
    throw new Error("User not found");
  }
};

const findUserWithPromise = (id: number): Promise<USER> => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      resolve(user);
    } else {
      reject(new Error("User not found"));
    }
  });
};

findUserWithCallback(1, (user) => console.log(user));

findUserWithPromise(2)
  .then((user) => console.log(user))
  .catch((error) => console.error(error));
