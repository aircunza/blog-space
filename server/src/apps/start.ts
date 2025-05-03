import { AppBackend } from "./app";

try {
  new AppBackend({ addSocketIo: false }).start();
} catch (e) {
  console.log(e);
}

process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
  process.exit(1);
});
