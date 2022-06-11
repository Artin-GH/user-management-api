import app from "../app";
import { default as debugModule, Debugger } from "debug";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";

const debug: Debugger = debugModule("exp-blog:server");
dotenv.config();

const port: number = parseInt(process.env.PORT || "3000");
const hostname: string = process.env.HOSTNAME || "localhost";
app.set("port", port);

const mongoUrl = `mongodb://${process.env.MONGO_HOSTNAME || ""}:${
  process.env.MONGO_PORT || ""
}/user-api`;
mongoose.connect(mongoUrl);

const server: http.Server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

console.log(`Listening on http://${hostname}:${port}`);

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind: string =
    typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind =
    typeof addr === "string"
      ? "pipe " + addr
      : "port " + (addr || { port: "unknown" }).port;
  debug("Listening on " + bind);
}
