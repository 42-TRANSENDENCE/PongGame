
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

export function game_single_frame(game) {
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

export function handle_gameKey(game, keyCode) {

  if ( !game || !game.room || !GameInfos[game.room]){
    console.log("undefined")
    return ;
  }
  if (keyCode === 32) {
    console.log("space")
    GameInfos[game.room].ongame = !(GameInfos[game.room].ongame);
    return;
  }

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