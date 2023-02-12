const express = require("express");
const app = express();
const port = 3001;
const http = require("http");
const cors = require("cors")
const server = http.createServer(app);
const { Server } = require("socket.io")

let userNo = 0;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

server.listen(port, () => {
  console.log(`Server Listening to ${port}`)
});

io.on("connection", (socket) => {
  if (userNo < 3) {
    userNo = userNo + 1;
    console.log(`Connected : ${socket.id}, ${userNo}`);
    socket.emit("enterance", userNo);
  
    socket.on("disconnect", () => {
      userNo = userNo - 1;
      console.log(`Disconnected : ${socket.id}, ${userNo}`)
    });
  
    socket.on("test_emit", (data) => {
      console.log(data);
    })
  } else {
    console.log(`Too Many Users : ${socket.id}`);
    socket.emit("enterance", 0);
  }
})