const express = require("express");
const app = express();
const port = 3001;
const http = require("http");
const cors = require("cors")
const server = http.createServer(app);
const { Server } = require("socket.io")
const GAMELIST = require("./game.json")
const USERLIST = require("./users.json")

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
  socket.emit("update", x, y );

  socket.on("disconnect", () => {
    userNo = userNo - 1;
    console.log(`Disconnected : ${socket.id}, ${userNo}`)
  });

  socket.on("newPlayer", (data) => {
    console.log("new Player Join! : ", data);
    
    const animate_ball = setInterval(animate, 15);

    let time = setTimeout(() => {
      clearInterval(animate_ball);
    }, 10000)
    
  });

  socket.on("keypress", (keyCode) => {
    console.log("key pressed!!, ", keyCode);
    handle_gameKey(keyCode);
  }) ;    
}


// TODO : 키보드 입력을 처리할 떄, 매 입력마다 처리하는게 아니라 keydown 과 keyup을 함께 이용하여 
// 서버 내부적으로 flag를 사용하면 통신 bandwidth를 줄일 수 있따. 유뷰트 3 참고하여 수정하기
function handle_gameKey (keyCode) {
  if (keyCode === KEY_RIGHT && x < TABLE_W - GAP) // ballrad : 15, padding : 5
    x = x + vel;
  else if (keyCode === KEY_LEFT && x > GAP) // ballrad : 15, padding : 5
   x = x - vel;
  else if (keyCode === KEY_UP && y > GAP) // ballrad : 15, padding : 5
    y = y - vel;
  else if (keyCode === KEY_DOWN && y < TABLE_H - GAP) // ballrad : 15, padding : 5
    y = y + vel;
  else
    return;
  console.log("key update!!, ", x, y);
  io.emit("update", x, y );
  return; 
}

function animate(){
  if (x < GAP || x > TABLE_W - GAP) // ballrad : 15, padding : 5
    dx = -dx;
  if (y < GAP || y > TABLE_H - GAP) // ballrad : 15, padding : 5
    dy = -dy;;
  
  x += dx;
  y += dy;
  io.emit("update", x, y );
}