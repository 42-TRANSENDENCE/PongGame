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



const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

server.listen(port, () => {
  console.log(`Server Listening to ${port}`)
});

const TABLE_W = 700;
const TABLE_H = 400;
const GAP = 20; // ballrad : 15, padding : 5
let x = TABLE_W / 2;
let y = TABLE_H / 2;
const vel = 5;
let dx = vel / 2;
let dy = vel / 2;



io.on("connection", handle_connection);
// console.log(GAMELIST);
// console.log(USERLIST);

function handle_connection(socket) {
  (user_count < MAXUSER) ? connect_accept(socket) : connect_refuse(socket)
}

function connect_refuse(socket){
  console.log(`Too Many Users : ${socket.id}`);
  socket.emit("enterance", -1);
}

let user_count = 0;
const MAXUSER = 6;
let PlayerInfos ={}; // 전체 접속한 플레이어이다.
let GameInfos = {}; // 생성된 게임의 정보이다.
let i = 0;

// const FRAME = 50;
const FREQUENCY = 15;
setInterval(loop, FREQUENCY);
function connect_accept(socket) {
  // socket listenter
  socket.on("disconnect", () => {
    user_count = user_count - 1;
    delete PlayerInfos[socket.id]
    console.log(`Disconnected : ${socket.id}, ${user_count}`)
  });

  socket.on("keypress", handle_gameKey);


  // accept function
  user_count = user_count + 1;
  let roomNo = Math.round(user_count / 2);
  socket.join(roomNo);
  console.log(`Connected : ${socket.id}, ${user_count}, ROOM#${roomNo}`);
  if (user_count % 2 === 1) {
    PlayerInfos[socket.id] = {room: roomNo, position: "left"}
  } else {
    PlayerInfos[socket.id] = {room: roomNo, position: "right"}
    GameInfos[roomNo] = { 
                          ball    : [0, 0],
                          rad     : BALL_RAD,
                          vel     : [5, 5],
                          paddle  : [0, 0],
                          score   : [0, 0]
                        }
    
  }
  socket.emit("game_enter", PlayerInfos[socket.id]);
}



const KEY_UP = 38;
const KEY_DOWN = 40;
const TABLE_LEFT = -600;
const TABLE_RIGHT = 600;
const TABLE_TOP = -400;
const TABLE_BOTTOM = 400;
const BALL_RAD = 30;
const PADDLE_H = 160;
const PADDLE_W = 8;
const PADDLE_L = 40;
const PADDLE_R = 40;
let time = 0

function loop() {
  gameloop();
}

function gameloop () {

  for (let i = 1 ; i <= user_count / 2; i++ ) {
    const game = GameInfos[i];
    if (game === undefined)
      console.log("wating for player2");
    else {
      GameInfos[i] = game_single_frame(game)
      io.to(i).emit("update", GameInfos[i]);
    }
  }
}

function game_single_frame(game) {
  game.vel = collid_check(game);

  game.ball[0] += game.vel[0];
  game.ball[1] += game.vel[1];  

  return game;
}

function collid_check( game ) {

  const x = game.ball[0];
  const y = game.ball[1];
  let dx = game.vel[0];
  let dy = game.vel[1];
  
  const left_paddle_top = game.paddle[0] - PADDLE_H / 2;
  const left_paddle_bot = game.paddle[0] + PADDLE_H / 2;
  const right_paddle_top = game.paddle[1] - PADDLE_H / 2;
  const right_paddle_bot = game.paddle[1] + PADDLE_H / 2;

  const left_paddle_left = TABLE_LEFT + PADDLE_L - PADDLE_W / 2;
  const left_paddle_right = TABLE_LEFT  + PADDLE_L + PADDLE_W / 2;
  const right_paddle_left = TABLE_RIGHT - PADDLE_R - PADDLE_W / 2;
  const right_paddle_right = TABLE_RIGHT - PADDLE_R + PADDLE_W / 2;
  
  // 1. wall collid
  if ((x <= TABLE_LEFT + BALL_RAD ) || (x >= TABLE_RIGHT - BALL_RAD)) 
    dx = -dx;
  if (y <= TABLE_TOP + BALL_RAD || y >= TABLE_BOTTOM - BALL_RAD ) 
    dy = -dy
  // 2. paddle_collid
  if (
      (dx < 0) && 
      (left_paddle_top < y && y < left_paddle_bot) && 
      (left_paddle_left + BALL_RAD < x && x < left_paddle_right + BALL_RAD )
    )
    dx = -dx;
  if (
      (dx > 0) && 
      (right_paddle_top < y && y < right_paddle_bot) &&
      ( right_paddle_left - BALL_RAD < x && x < right_paddle_right - BALL_RAD)
    )
    dx = -dx;

  // 3. return;
  return ([dx, dy]);
}

function handle_gameKey(game, keyCode) {

  if (GameInfos[game.room] === undefined)
    return ;

  if (game.position === "left") {
    if ( keyCode === KEY_UP &&
         GameInfos[game.room].paddle[0] >= TABLE_TOP + PADDLE_H / 2
       )
      GameInfos[game.room].paddle[0] -= 30;
    if ( keyCode === KEY_DOWN && 
         GameInfos[game.room].paddle[0] <= TABLE_BOTTOM - PADDLE_H / 2
       )
      GameInfos[game.room].paddle[0] += 30;
  }

  else if (game.position === "right") {
    if ( keyCode === KEY_UP && 
         GameInfos[game.room].paddle[1] >= TABLE_TOP + PADDLE_H / 2
       ) 
       GameInfos[game.room].paddle[1] -= 30;
    if (keyCode === KEY_DOWN &&
        GameInfos[game.room].paddle[1] <= TABLE_BOTTOM - PADDLE_H / 2
       )
       GameInfos[game.room].paddle[1] += 30;
  }


  io.to(game.room).emit("update",  GameInfos[game.room]);
}