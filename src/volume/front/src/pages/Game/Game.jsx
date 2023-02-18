import './Game.css'
import React, { useEffect } from 'react'
import Canvas__background from './Canvas__background';
import Canvas__foreground from './Canvas__foreground';

const Game = ({props}) => {
  const socket = props;
  let game_basic_info = null;
  const canv_width = "1800";
  const canv_height = "1200";

  const keyPressed = (e) => {
    console.log(game_basic_info);
    socket.emit("keypress", game_basic_info, e.keyCode);
  }
    
  // 서버에 연결된 client의 정보를 주면 서버가 그 정보를 저장하고, broadcast하게 된다.
  // 따라서 처음 인스턴스가 생길 때, 보내준다.
  useEffect ( () => {
    // RoomNo와 패들 위치(left rigth)에 대한 정보를 받는다.
    socket.on("game_enter", (info) => { 
      game_basic_info = info;
      console.log("none ", game_basic_info);
    })
    
    document.addEventListener('keydown', keyPressed);
    return () => {
      document.removeEventListener('keydown', keyPressed);
    }
  }, [])

  return (
    <>
      <div className='game__body'>
        <div className='game__body_topbar'>TOPBAR</div>
        <Canvas__background 
          socket={socket}
          width={canv_width}
          height={canv_height}
        />
        <Canvas__foreground
          socket={socket}
          width={canv_width}
          height={canv_height}
        />
      </div>
    </>
  )
}

export default Game