import { Injectable } from "@nestjs/common";
import { Socket } from "dgram";
import { Namespace } from "socket.io";

const TABLE_LEFT = -600;
const TABLE_RIGHT = 600;
const TABLE_TOP = -400; // aspect_ratio : 2/3
const TABLE_BOTTOM = 400;
const BALL_RAD = 30;
const PADDLE_H = 160; //
const PADDLE_W = 8;
const PADDLE_L = 40;
const PADDLE_R = 40;
const WIN_SCORE = 3;

type GameDataType = {
  ball_pos   : { x : number, y : number };
  ball_vel   : { x : number, y : number };
  paddle_pos : { p1: number, p2: number };
  score      : { p1: number, p2: number }
}

type GameType = {
  gameId     : string;
  isIngame   : boolean;
  isReady    : {p1 : boolean, p2 : boolean};
  players    : {p1 : string, p2 : string }
  spectators : Array<string>;
  data       : GameDataType;
}

@Injectable()
export class GameService {

  makeNewRoom(
    nsp : Namespace,
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
        ball_vel   : { x : 4, y : 3 },
        paddle_pos : { p1: 0, p2: 0 },
        score      : { p1: 0, p2: 0}
      }
    }
    this.__game_list.set(roomId, game);
    //console.log(this.__game_list);
  }

  handleKeyboardInput(
    roomId : string, 
    socketId : string, 
    keyCode : string
  ) : void {
    let game = this.__game_list.get(roomId);
    //if (keyCode === 'ArrowUp') {
    //  if (socketId === game.players.p1)
    //    game.data.paddle_pos.p1 -= 30;
    //  else if (socketId === game.players.p2)
    //    game.data.paddle_pos.p2 -= 30; 
    //} else if (keyCode === 'ArrowDown') {
    //  if (socketId === game.players.p1)
    //    game.data.paddle_pos.p1 += 30;
    //  else if (socketId === game.players.p2)
    //    game.data.paddle_pos.p2 += 30; 
    //}
    //else
    //  return;
    if (socketId === game.players.p1) {
      const paddle_pos : number = game.data.paddle_pos.p1;
      if ( keyCode === 'ArrowUp' && 
           paddle_pos >= TABLE_TOP + PADDLE_H / 2) {
        game.data.paddle_pos.p1 = paddle_pos - 30;
      }
      if (keyCode === 'ArrowDown' &&
          paddle_pos <= TABLE_BOTTOM - PADDLE_H / 2){
        game.data.paddle_pos.p1 = paddle_pos + 30;
      }
    }
    if (socketId === game.players.p2) {
      const paddle_pos : number = game.data.paddle_pos.p2;
      if ( keyCode === 'ArrowUp' &&
           paddle_pos >= TABLE_TOP + PADDLE_H / 2) {
        game.data.paddle_pos.p2 = paddle_pos - 30;
      }
      if (keyCode === 'ArrowDown' &&
          paddle_pos <= TABLE_BOTTOM - PADDLE_H / 2) {
        game.data.paddle_pos.p2 = paddle_pos + 30;
      }
    }
    console.log("key :", keyCode);
  }
  
  handlePlayerReady(
    nsp : Namespace,
    roomId: string,
    socketId: string
  ) {
    let game = this.__game_list.get(roomId);
    console.log(roomId, socketId, "READY!");
    if (game) {
      if (socketId === game.players.p1)
        game.isReady.p1 = true;
      else if (socketId === game.players.p2)
        game.isReady.p2 = true;
      console.log("game UPDATE : ", game);
    }
    if (game.isReady.p1 && game.isReady.p2) {
      nsp.to(roomId).emit("game_start", game.players.p1);
      //console.log("했다 치고");
      this.__start_game(nsp, game);
    }
  }

  //game_loop(
  //  nsp: Namespace
  //) : void {
  //  this.__game_list.forEach((value) => {
  //    if (value.isIngame === true) {
  //      value = this.__single_game_frame(value);
  //      nsp.to(value.gameId).emit("update", value.data.ball_pos);
  //      if (value.data.score.p1 >= 5 || value.data.score.p1 >= 5)
  //        this.__game_list.delete(value.gameId);
  //    }
  //  })
  //}

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
      g = this.__single_game_frame(nsp, g);
      if (g.data.score.p1 >= WIN_SCORE) {
        nsp.to(g.gameId).emit("game_over", g.players.p1);
        console.log("게임 종료")
        clearInterval(gameLoop);
      } else if (g.data.score.p2 >= WIN_SCORE ) {
        nsp.to(g.gameId).emit("game_over", g.players.p2);
        console.log("게임 종료")
        clearInterval(gameLoop);
      } else {
        console.log("updating", g.data.ball_pos, g.data.paddle_pos)
        nsp.to(g.gameId).emit("update_ball", {
          ball_pos   : g.data.ball_pos,
          paddle_pos : g.data.paddle_pos,
        })
      }
    }, 50)
  }

  private __single_game_frame(
    nsp: Namespace,
    game : GameType,
  ) : GameType {
    let next_game = game;
    next_game.data.ball_vel = this.__collid_check(game);
    next_game.data.score = this.__score_check(nsp, game);
    next_game.data.ball_pos.x += next_game.data.ball_vel.x;
    next_game.data.ball_pos.y += next_game.data.ball_vel.y;
    return next_game;
  }


  private __collid_check (
    game : GameType
  ) : {x: number, y: number} {
    let vel = game.data.ball_vel;

    vel = this.__wall_collision(game.data);
    vel = this.__paddle_collision(game.players.p1, game);
    vel = this.__paddle_collision(game.players.p2, game);
    return (vel);
  }

  private __score_check(
    nsp : Namespace,
    game : GameType,
  ) : {p1: number, p2: number} {
    const pos = game.data.ball_pos
    let score = game.data.score;

    if (pos.x <= TABLE_LEFT + BALL_RAD)
      score.p1 += 1;
    else if (pos.x >= TABLE_RIGHT - BALL_RAD)
      score.p2 += 1;
    else
      return (score);
    nsp.to(game.gameId).emit("update_score", score);
    return (score);
  }


  private __wall_collision (
    positions : GameDataType
  ) : {x: number, y: number} {
    let pos = positions.ball_pos;
    let vel = positions.ball_vel;

    if (pos.x <= TABLE_LEFT + BALL_RAD ||
        pos.x >= TABLE_RIGHT - BALL_RAD )
      vel.x = -vel.x;
    if (pos.y <= TABLE_TOP + BALL_RAD || 
        pos.y >= TABLE_BOTTOM - BALL_RAD)
      vel.y = -vel.y;

    return (vel);
  }


  private __paddle_collision (
    player : string,
    game : GameType
  ) : {x: number, y: number} {
    let center;
    let vel = game.data.ball_vel;
    const ball = game.data.ball_pos;

    if (player === game.players.p1)
      center = {x: TABLE_LEFT + PADDLE_L, y: game.data.paddle_pos.p1}
    else if (player === game.players.p2)
      center = {x: TABLE_RIGHT - PADDLE_R, y: game.data.paddle_pos.p2}
    else
      return vel;
    
    const top   = center.y - PADDLE_H / 2;
    const bot   = center.y + PADDLE_H / 2;
    const left  = center.x - PADDLE_W / 2;
    const right = center.x + PADDLE_W / 2;

    if (ball.x > right || ball.x < left || ball.y > bot || ball.y < top)
      return (vel);
    else if ( this.__point_circle_collid({x: left , y: top}, ball) ||
         this.__point_circle_collid({x: right, y: top}, ball) ||
         this.__point_circle_collid({x: left , y: bot}, ball) ||
         this.__point_circle_collid({x: right, y: bot}, ball) )
      vel = {x: -vel.y, y: -vel.x};
    //else if (ball.x >=)
    
    
    return (vel);
  }

  private __point_circle_collid(
    point: {x: number, y: number},
    pos: {x: number, y: number}
  ) : boolean {
    if ( (point.x - pos.x)**2 + (point.y - pos.y)**2 <= (BALL_RAD)**2)
      return true;
    return false;
  }
}