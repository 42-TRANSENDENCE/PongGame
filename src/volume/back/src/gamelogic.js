// ball_pos : { x: x y: y}
// p1_y : y 
// p2_y : y 
// function GameSetup(ball_pos, p1_y, p2_y);
// function Scoreing(p1, p2);
// function InGame( server );
// function GameOver(p1, p2, winner);
// function GameLogic( server );

const FREQUENCY = 1000/120;
const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_DOWN = 40;

const RAD = 15;
const TABLE_W = 700;
const TABLE_H = 400;
const GAP = 20; // ballrad : 15, padding : 5
const VEL = 2;


export function GameLogic( io, socket, roomid ) { 
  console.log("new Player Join! : ");
  let game_info = GameSetup();
  
  socket.on("keypress", (keyCode) => {
    console.log("key pressed!!, ", keyCode);
    game_info = handle_gameKey(keyCode, game_info);
    io.to(roomid).emit("update", game_info);
  }) ;
  
  setInterval( () => {
    game_info = GameLoop( io, socket, game_info )
    io.to(roomid).emit("update", game_info );
  }, FREQUENCY)
}

function GameSetup( ) {
  return (
    {
      pos: [TABLE_W / 2,  TABLE_H / 2], 
      vel: [VEL, VEL / 2],
      player: [TABLE_H / 2, TABLE_H / 2],
      time: 0
    }
  );
}

function GameLoop ( server, socket, info ) {
  // 1. score check 

  // 2. check collidation
  info.vel = collid_check(info);
  
  // 3. update info
  info.pos[0] += info.vel[0];
  info.pos[1] += info.vel[1];
  info.time += FREQUENCY;

  // 4. return
  return info;
}

function collid_check( info ) {
  const x = info.pos[0];
  const y = info.pos[1];
  let dx = info.vel[0];
  let dy = info.vel[1];
  const left_paddle_top = info.player[0] - 40;
  const left_paddle_bot = info.player[0] + 40;
  const right_paddle_top = info.player[1] - 40;
  const right_paddle_bot = info.player[1] + 40;
  // 1. wall collid
  if ((x < GAP) || (x > TABLE_W - GAP)) 
    dx = -dx;
  if (y < GAP || y > TABLE_H - GAP) 
    dy = -dy
  // 2. paddle_collid
  if ( (dx < 0) && (left_paddle_top < y && y < left_paddle_bot) && ( 15 + RAD < x && x < 25 + RAD ))
    dx = -dx;
  if ( (dx > 0) && (right_paddle_top < y && y < right_paddle_bot) && ( 700 - 25 - RAD < x && x < 700 - 15 - RAD))
    dx = -dx;

  // 3. return;
  return ([dx, dy]);
}


// TODO : 키보드 입력을 처리할 떄, 매 입력마다 처리하는게 아니라 keydown 과 keyup을 함께 이용하여 
// 서버 내부적으로 flag를 사용하면 통신 bandwidth를 줄일 수 있따. 유뷰트 3 참고하여 수정하기
function handle_gameKey (keyCode, info) {
  // collid check
  let y = info.player[0];
  if (keyCode === KEY_UP && y - 40 > 5) // ballrad : 15, padding : 5
    y = y - 10;
  else if (keyCode === KEY_DOWN && y  + 40 < TABLE_H - 5) // ballrad : 15, padding : 5
    y = y + 10;
  else
    return info;
  info.player[0] = y;
  return info; 
}


