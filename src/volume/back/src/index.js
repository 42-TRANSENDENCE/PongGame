import * as game from "./gamelogic.js"

// const express = require("express");
import express from 'express'
import http from 'http'
import cors from 'cors'
import {Server} from 'socket.io'

import GAMELIST from "./game.json"  assert { type: "json" };
import USERLIST from "./users.json" assert { type: "json" };

const app = express();
const port = 3001;
const server = http.createServer(app);

let userNo = 0;
const MAXUSER = 2;

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
const GAP = 20; // ballrad : 15, padding : 5
let x = TABLE_W / 2;
let y = TABLE_H / 2;
const vel = 10;
let dx = vel / 2;
let dy = vel / 2;

io.on("connection", handle_connection);
console.log(GAMELIST);
console.log(USERLIST);

function handle_connection(socket) {
  (userNo < MAXUSER) ? connect_accept(socket) : connect_refuse(socket)
}

function connect_refuse(socket){
  console.log(`Too Many Users : ${socket.id}`);
  socket.emit("enterance", -1);
}

function connect_accept(socket) {
  userNo = userNo + 1;
  console.log(`Connected : ${socket.id}, ${userNo}`);
  socket.emit("enterance", userNo);

  socket.on("disconnect", () => {
    userNo = userNo - 1;
    console.log(`Disconnected : ${socket.id}, ${userNo}`)
  });

  /*                                */
  /*                                */
  /*              GAME              */
  /*                                */
  /*                                */
  socket.on("newPlayer", (data) => {
    console.log("new Player Join! : ", data);
    game.GameLogic( io, socket );
  });
}