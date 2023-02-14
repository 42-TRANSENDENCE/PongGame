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
  }
});

server.listen(port, () => {
  console.log(`Server Listening to ${port}`)
});

const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_DOWN = 40;

const TABLE_W = 700;
const TABLE_H = 400;
const BALL_RAD = 15;
let x = TABLE_W / 2;
let y = TABLE_H / 2;
const dx = 1;
const dy = 1;
io.on("connection", (socket) => {
  if (userNo < 3) {
    userNo = userNo + 1;
    console.log(`Connected : ${socket.id}, ${userNo}`);
    socket.emit("enterance", userNo);
  
    socket.on("disconnect", () => {
      userNo = userNo - 1;
      console.log(`Disconnected : ${socket.id}, ${userNo}`)
    });
    socket.on("newPlayer", (data) => {
      console.log("new Player Join! : ", data);
    });
    socket.on("keypress", (keyCode) => {
      console.log("key pressed!!, ", keyCode);
      switch (keyCode) {
        case KEY_RIGHT :
          if (x < TABLE_W - BALL_RAD)
            x = x + dx;
          console.log("key update!!, ", x, y);
          io.emit("update", x, y )
          break;
        case KEY_LEFT :
          if (x > BALL_RAD)
            x = x - dx;
          console.log("key update!!, ", x, y);
          io.emit("update", x, y )
          break;
        case KEY_UP :
          if (y > BALL_RAD)
            y = y - dy;
          console.log("key update!!, ", x, y);
          io.emit("update", x, y )
          break;
        case KEY_DOWN :
          if (y < TABLE_H - BALL_RAD)
            y = y + dy;
          console.log("key update!!, ", x, y);
          io.emit("update", x, y )
          break;
        default :
          break;
      }
    })
  } else {
    console.log(`Too Many Users : ${socket.id}`);
    socket.emit("enterance", 0);
  }
})