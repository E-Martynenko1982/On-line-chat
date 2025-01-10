const express = require("express");
const app = express();
const PORT = 5000;

const cors = require("cors");
const http = require("http").Server(app);

app.use(cors());
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  }
});

app.get("api", (req, res) => {
  res.json({
    message: "Hello",
  })
});

let users = [];

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);

  socket.on("message", (data) => {
    socketIO.emit("response", data);
  });
  socket.on("typing", (data) => socket.broadcast.emit("responseTyping", data));
  socket.on("newUser", (data) => {
    users.push(data);
    socketIO.emit('responseNewUser', users);
  });

  socket.on("logout", (socketID) => {
    users = users.filter(user => user.socketID !== socketID);
    socketIO.emit('responseNewUser', users);
  });

  socket.on("disconnect", () => {
    users = users.filter(user => user.socketID !== socket.id);
    socketIO.emit('responseNewUser', users);
    console.log(`${socket.id} user disconnected`);
  });
});

http.listen(PORT, () => {
  console.log("Server working");
});