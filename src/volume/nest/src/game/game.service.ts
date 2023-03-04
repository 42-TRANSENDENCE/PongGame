import { Injectable } from "@nestjs/common";
import { Namespace } from "socket.io";

const TABLE_LEFT = -600;
const TABLE_RIGHT = 600;
const TABLE_TOP = -400; // aspect_ratio : 2/3
const TABLE_BOTTOM = 400;
const BALL_RAD = 30;
const PADDLE_H = 160; //
const PADDLE_W = 24;
const PADDLE_L = 40;
const PADDLE_R = 40;
const WIN_SCORE = 5;
const PADDLE_SPEED = 10;
const BALL_VEL_INIT_X = 4;
const BALL_VEL_INIT_Y = 3;
const ACCEL_RATIO = 1.1;

type GameDataType = {
  ball_pos   : { x : number,  y : number };
  ball_vel   : { x : number,  y : number };
  paddle_pos : { p1: number,  p2: number };
  score      : { p1: number,  p2: number };
  up_pressed : { p1: boolean, p2: boolean};
  down_pressed:{ p1: boolean, p2: boolean};
}

type GameType = {
  gameId     : string;
  isIngame   : boolean;
  isReady    : {p1 : boolean, p2 : boolean};
  players    : {p1 : string,  p2 : string };
  spectators : Array<string>;
  data       : GameDataType;
}

@Injectable()
export class GameService {

  makeNewRoom(
    roomId : string,
    p1 : string,
    p2 : string,
  ) {
    console.log("new room Created", roomId);
    const game : GameType = {
      gameId: roomId,
      isIngame: false,
      isReady : {p1: false, p2: false},
      players: {p1: p1, p2: p2},
      spectators: [],
      data : {
        ball_pos   : { x : 0, y : 0 },
        ball_vel   : { x : BALL_VEL_INIT_X, y : BALL_VEL_INIT_Y },
        paddle_pos : { p1: 0, p2: 0 },
        score      : { p1: 0, p2: 0 }, 
        up_pressed : { p1: false, p2: false},
        down_pressed:{ p1: false, p2: false}
      }
    }
    this.__game_list.set(roomId, game);
  }

  handleKeyPressed(
    roomId : string, 
    socketId : string, 
    keyCode : string
  ) {
    let game = this.__game_list.get(roomId);
    if (socketId === game.players.p1) {
      if ( keyCode === 'ArrowUp' )
        game.data.up_pressed.p1 = true;
      else if ( keyCode === 'ArrowDown' )
        game.data.down_pressed.p1 = true;
    } else if (socketId === game.players.p2) {
      if ( keyCode === 'ArrowUp' )
        game.data.up_pressed.p2 = true;
      else if ( keyCode === 'ArrowDown' )
        game.data.down_pressed.p2 = true;
    }
  }

  handleKeyReleased(
    roomId : string, 
    socketId : string, 
    keyCode : string
  ) {
    let game = this.__game_list.get(roomId);
    if (socketId === game.players.p1) {
      if ( keyCode === 'ArrowUp' )
        game.data.up_pressed.p1 = false;
      else if ( keyCode === 'ArrowDown' )
        game.data.down_pressed.p1 = false;
    } else if (socketId === game.players.p2) {
      if ( keyCode === 'ArrowUp' )
        game.data.up_pressed.p2 = false;
      else if ( keyCode === 'ArrowDown' )
        game.data.down_pressed.p2 = false;
    }
  }
  
  handlePlayerReady(
    nsp : Namespace,
    roomId: string,
    socketId: string
  ) {
    let game = this.__game_list.get(roomId);
    if (game) {
      if (socketId === game.players.p1)
        game.isReady.p1 = true;
      else if (socketId === game.players.p2)
        game.isReady.p2 = true;
      console.log("player state : ", game.isReady);
    }
    if (game.isReady.p1 && game.isReady.p2) {
      nsp.to(roomId).emit("game_start", game.players.p1);
      this.__start_game(nsp, game);
    }
  }

  /* ======= private ====== */
  /* attribute */
  private __game_list : Map<string, GameType> = new Map<string, GameType>();

  /* method */
  private __start_game(
    nsp : Namespace,
    game : GameType
  ) {
    let g = game;
    console.log("loop 시작");

    const gameLoop = setInterval(() => {
      this.__single_game_frame(nsp, g);
      if (g.data.score.p1 >= WIN_SCORE) {
        nsp.to(g.gameId).emit("game_over", g.players.p1);
      } else if (g.data.score.p2 >= WIN_SCORE ) {
        nsp.to(g.gameId).emit("game_over", g.players.p2);
      } else {
        nsp.to(g.gameId).emit("update_ball", {
          ball_pos   : g.data.ball_pos,
          paddle_pos : g.data.paddle_pos,
        })
        // console.log("updating", g.data.ball_pos, g.data.paddle_pos)
        return;
      }
      console.log("게임 종료")
      clearInterval(gameLoop);
    }, 1000 / 60)
  }

  private __single_game_frame(
    nsp: Namespace,
    game : GameType,
  ) : void {
    this.__score_check(nsp, game);
    this.__collid_check(game);
    game.data.ball_pos.x += game.data.ball_vel.x;
    game.data.ball_pos.y += game.data.ball_vel.y;
    this.__keyboard_check(game);
  }

  private __keyboard_check(
    game: GameType
  ) {
    const p1_dir : number = Number(game.data.down_pressed.p1) - Number(game.data.up_pressed.p1);
    const p2_dir : number = Number(game.data.down_pressed.p2) - Number(game.data.up_pressed.p2);
    
    game.data.paddle_pos.p1 += PADDLE_SPEED * p1_dir;
    game.data.paddle_pos.p2 += PADDLE_SPEED * p2_dir;

    if ( game.data.paddle_pos.p1 < TABLE_TOP + PADDLE_H / 2 )
      game.data.paddle_pos.p1 = TABLE_TOP + PADDLE_H / 2;
    else if ( game.data.paddle_pos.p1 >  TABLE_BOTTOM - PADDLE_H / 2 )
      game.data.paddle_pos.p1 = TABLE_BOTTOM - PADDLE_H / 2;
    if ( game.data.paddle_pos.p2 < TABLE_TOP + PADDLE_H / 2 )
      game.data.paddle_pos.p2 = TABLE_TOP + PADDLE_H / 2;
    else if ( game.data.paddle_pos.p2 >  TABLE_BOTTOM - PADDLE_H / 2 )
      game.data.paddle_pos.p2 = TABLE_BOTTOM - PADDLE_H / 2;
  }

  private __collid_check (
    game : GameType
  ) : void {
    this.__wall_collision(game.data);
    this.__paddle_collision(game.players.p1, game);
    this.__paddle_collision(game.players.p2, game);
  }

  private __score_check(
    nsp : Namespace,
    game : GameType,
  ) : void {
    const pos = game.data.ball_pos
    let score = game.data.score;

    if (pos.x <= TABLE_LEFT + BALL_RAD)
      score.p2 += 1;
    else if (pos.x >= TABLE_RIGHT - BALL_RAD)
      score.p1 += 1;
    else
      return;
    nsp.to(game.gameId).emit("update_score", score);
    return ;
  }

  private __wall_collision (
    positions : GameDataType
  ) : void {
    let pos = positions.ball_pos;
    let vel = positions.ball_vel;

    if (pos.x <= TABLE_LEFT + BALL_RAD || pos.x >= TABLE_RIGHT - BALL_RAD ) {
          positions.ball_pos = {x: 0, y: 0};
          if (vel.x > 0) vel.x = -BALL_VEL_INIT_X;
          else           vel.x =  BALL_VEL_INIT_X;
          if (vel.y > 0) vel.y = -BALL_VEL_INIT_Y;
          else           vel.y =  BALL_VEL_INIT_Y;

        }
    if (pos.y <= TABLE_TOP + BALL_RAD || pos.y >= TABLE_BOTTOM - BALL_RAD)
      vel.y = -vel.y;
  }

  private __paddle_collision (
    player : string,
    game : GameType
  ) : void {
    let center;
    let vel = game.data.ball_vel;
    const ball = game.data.ball_pos;

    if (player === game.players.p1){
      center = {x: TABLE_LEFT + PADDLE_L, y: game.data.paddle_pos.p1}
    }
    else if (player === game.players.p2) {
      center = {x: TABLE_RIGHT - PADDLE_R, y: game.data.paddle_pos.p2}
    }
    else
      return;
    const rad   = PADDLE_W / 2;
    const top   = center.y - PADDLE_H / 2 + rad;
    const bot   = center.y + PADDLE_H / 2 - rad;
    const left  = center.x - PADDLE_W / 2 - BALL_RAD;
    const right = center.x + PADDLE_W / 2 + BALL_RAD;

    if (left <= ball.x && ball.x <= right && top <= ball.y && ball.y <= bot) {
      game.data.ball_vel = {x: -vel.x, y: vel.y};
    } else if (this.__circle_collid( {x: ball.x,   y: ball.y, rad: BALL_RAD}, 
                                     {x: center.x, y: top,    rad: rad} ) ||
               this.__circle_collid( {x: ball.x,   y: ball.y, rad: BALL_RAD},
                                     {x: center.x, y: bot,    rad: rad} )) {
      game.data.ball_vel = {x: -vel.x, y: -vel.y};
    } else {
      return ;
    }
    game.data.ball_vel.x *= ACCEL_RATIO;
    game.data.ball_vel.y *= ACCEL_RATIO;
  }

  private __circle_collid(
    c1 : {x: number, y: number, rad: number},
    c2: {x: number, y: number, rad: number}
  ) : boolean {
    if ( (c1.x - c2.x)**2 + (c1.y - c2.y)**2 <= (c1.rad + c2.rad)**2)
      return true;
    return false;
  }
}