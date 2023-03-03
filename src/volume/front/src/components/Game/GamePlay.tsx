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
  
  const keyPressed = (e : KeyboardEvent) => {
      console.log(room_id, e.code);
      if(["ArrowUp","ArrowDown"].indexOf(e.code) > -1) { 
        game_socket.emit("keypress", room_id, e.code);
    } 
  }

  const gameStart = ( p1_id : string ) : void => {
    console.log("시작")
    if (p1_id !== game_socket.id) {
      setColor('green');
    }
    document.addEventListener('keydown', keyPressed,);
    game_socket.off("game_start");
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

    game_socket.emit("ready", room_id);
    return () => {
      window.removeEventListener("keydown", default_keyoff);
      document.removeEventListener('keydown', keyPressed);
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

