import './Game.css'
import React, {useEffect, useRef} from 'react'
import Canvas__background from './Canvas__background';
import Canvas__foreground from './Canvas__foreground';

const Game = ({props}) => {
  const socket = props;

  const keyPressed = (e) => {
      socket.emit("keypress", e.keyCode);
  }
  // 서버에 연결된 client의 정보를 주면 서버가 그 정보를 저장하고, broadcast하게 된다.
  // 따라서 처음 인스턴스가 생길 때, 보내준다.
  useEffect ( () => {
    socket.emit("newPlayer", `${socket}`);
    document.addEventListener('keydown', keyPressed);
    return () => {
      document.removeEventListener('keydown', keyPressed);
    }
  }, [])

  return (
    <>
      {/* <div className='game__header'>
        HEADER
      </div> */}
      <div className='game__body'>
        <Canvas__background width="700" height="400"/>
        <Canvas__foreground socket={socket} width="700" height="400"/>
      </div>
      {/* <div className='game__footer'>
        FOOTER
      </div> */}
    </>
  )
}

export default Game