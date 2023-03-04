import '../../styles/Game/GamePlay.css'
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { GameState } from '../../components/Game/enums';

import Canvas__background from './Canvas__background';
import Canvas__foreground from './Canvas__foreground';

const CANV_WIDTH = "1800";
const CANV_HEIGHT = "1200";

export const GamePlay = (props : any) => {
  const game_socket : Socket = props.socket;
  const room_id : string = props.roomId;
  const setState = props.setGamestate;
  const [color, setColor] = useState("wheat");
  let up_pressed = false;
  let down_pressed = false;
  
  const KeyDown = (e : KeyboardEvent) => {
    if (up_pressed === false && e.code === "ArrowUp") {
      console.log(room_id, e.code);
      up_pressed = true;
      game_socket.emit("keypress", room_id, e.code);
    }
    if (down_pressed === false && e.code === "ArrowDown") {
      console.log(room_id, e.code);
      down_pressed = true;
      game_socket.emit("keypress", room_id, e.code);
    }
  }

  const KeyUp = (e : KeyboardEvent) => {
    if (up_pressed === true && e.code === "ArrowUp") {
      console.log(room_id, e.code);
      up_pressed = false;
      game_socket.emit("keyrelease", room_id, e.code);
    }
    if (down_pressed === true && e.code === "ArrowDown") {
      console.log(room_id, e.code);
      down_pressed = false;
      game_socket.emit("keyrelease", room_id, e.code);
    }
  }

  const gameStart = ( p1_id : string ) : void => {
    console.log("시작")
    if (p1_id !== game_socket.id) {
      setColor('green');
    } else {
      setColor ('red');
    }
    document.addEventListener('keydown', KeyDown);
    document.addEventListener('keyup', KeyUp);
    game_socket.off("game_start");
  }

  const gameOver = () : void => {
    document.removeEventListener('keydown', KeyDown);
    document.removeEventListener('keyup', KeyUp);
    game_socket.off("game_over");
  }

  const quitGame = () => {
    alert("나가?");
    game_socket.emit("quit_game");
    setState(GameState.Lobby);
  }

  useEffect(() => {
    console.log("게임으로 들어옴");
    window.addEventListener("keydown", default_keyoff);
    game_socket.on("game_start", gameStart)
    game_socket.on("game_over", gameOver)

    game_socket.emit("ready", room_id);
    return () => {
      window.removeEventListener("keydown", default_keyoff);
      document.removeEventListener('keydown', KeyDown);
      document.removeEventListener('keyup', KeyUp);
      console.log("게암 페이지 나감");
    }

  }, []);

  return (
      <div className='game__body'>
        <div className='container__canvas'>
          <Canvas__background socket={game_socket} width={CANV_WIDTH} height={CANV_HEIGHT} color={color}/>
          <Canvas__foreground socket={game_socket} width={CANV_WIDTH} height={CANV_HEIGHT} />
        </div>
        <div className='quit_button' onClick={quitGame}>
          <p>나가기</p>
        </div>
      </div>
  )
}


function default_keyoff( e : KeyboardEvent ) : void {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) { 
    e.preventDefault();
    e.stopPropagation();
  } 
}

