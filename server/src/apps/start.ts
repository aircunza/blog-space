import { AppBackend } from "./app";

try {
  new AppBackend({ addSocketIo: false }).start();
} catch (e) {
  console.error(e);
}

process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
  process.exit(1);
});
