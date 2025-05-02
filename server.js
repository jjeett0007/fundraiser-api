const http = require("http");
const WebSocket = require("ws");
const app = require("./app");
const config = require("./config/index");
const { setupSocket } = require("./socket/websocket");

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const PORT = config.port;

setupSocket(wss);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
