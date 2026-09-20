/**
 * Event Emitters
 * - emit() - emit an event
 * - on() - listen for an event
 * - once() - listen for an event once
 *
 * this is a class that allows you to emit and listen for events e.g. network events, when a user registers then send a welcome email
 */

import { EventEmitter } from "node:stream";

const appEvents = new EventEmitter();

type UserRegisterPayload = {
  id: string;
  email: string;
};

appEvents.once("user:register", (user: UserRegisterPayload) => {
  console.log("user registered", user);
});
appEvents.on("user:register", (user: UserRegisterPayload) => {
  console.log("user registered email is", user.email);
});
appEvents.on("user:register", (user: UserRegisterPayload) => {
  console.log("user registered id is", user.id);
});

function registerUser(id: string, email: string) {
  appEvents.emit("user:register", { id, email });
}

registerUser("1", "qHrjP@example.com");
