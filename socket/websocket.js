const express = require("express");
const http = require("http");
const config = require("../config/index");
const WebSocket = require("ws");
const jwt = require("jsonwebtoken");

const app = express();

const origins = config.socket.origin;
const jwtSecret = config.jwt.secret;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

function verifyOrigin(origin) {
  return origin === origins;
}

const userSockets = {};
console.log(userSockets);

function isUserConnected(userId) {
  const sockets = userSockets[userId];
  console.log(
    "user is connected?",
    sockets && sockets.some((socket) => socket.readyState === WebSocket.OPEN)
  );
  return (
    sockets && sockets.some((socket) => socket.readyState === WebSocket.OPEN)
  );
}

function sendMessageToUser(data) {
  const user = data.userId;

  const message = {
    type: "message",
    from: data.from,
    conversationId: data.conversationId,
    reload: true,
    message: data.message,
  };

  const sockets = userSockets[user];
  if (sockets && sockets.length > 0) {
    sockets.forEach((socket) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      }
    });
    console.log(`Message broadcasted to user ${userId}`);
  } else {
    console.log(`User ${userId} is not connected`);
  }
}

function addUserSocket(userId, ws) {
  if (!userSockets[userId]) {
    userSockets[userId] = [];
  }
  userSockets[userId].push(ws);
}

wss.on("connection", (ws, req) => {
  const origin = req.headers.origin;

  console.log("Connection attempt from origin:", origin);

  if (origin && !verifyOrigin(origin)) {
    ws.close(1000, "origin not allowed");
    console.log(`connetion from ${origin} denied`);
    return;
  } else if (origin && verifyOrigin(origin)) {
    console.log("new client connected");

    ws.on("message", (message) => {
      const data = JSON.parse(message);

      if (data.type === "request-id") {
        const token = data.token;

        let usersId = "";

        jwt.verify(token, jwtSecret, async (err, decoded) => {
          const decodedToken = jwt.verify(token, jwtSecret);
          const userId = decodedToken.id;
          usersId = userId;
        });

        addUserSocket(usersId, ws);

        ws.send(JSON.stringify({ type: "connection-id", id: usersId }));
      }
    });

    ws.on("close", () => {
      const userId = Object.keys(userSockets).find(
        (key) => userSockets[key] === ws
      );
      if (userId) {
        delete userSockets[userId];
        console.log(`User ${userId} disconnected`);
      }
    });
  }
});

module.exports = { app, server, isUserConnected, sendMessageToUser };