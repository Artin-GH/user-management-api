"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const debug_1 = __importDefault(require("debug"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const debug = (0, debug_1.default)("exp-blog:server");
dotenv_1.default.config();
const port = parseInt(process.env.PORT || "3000");
const hostname = process.env.HOSTNAME || "localhost";
app_1.default.set("port", port);
const mongoUrl = `mongodb://${process.env.MONGO_HOSTNAME || ""}:${process.env.MONGO_PORT || ""}/exp-books-api`;
mongoose_1.default.connect(mongoUrl);
const server = http_1.default.createServer(app_1.default);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log(`Listening on http://${hostname}:${port}`);
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
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
    const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + (addr || { port: "unknown" }).port;
    debug("Listening on " + bind);
}
