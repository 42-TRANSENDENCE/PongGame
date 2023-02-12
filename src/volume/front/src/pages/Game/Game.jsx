import './Game.css'
import React, {useEffect} from 'react'
//import { io } from 'socket.io-client';

const drawCanvas = () => {

}

const Game = ({props}) => {
  const socket = props;

  useEffect ( () => {
    socket.emit("test_emit", "안녕");
  }, [])

  return (
    <>
      <div className='game__header'>
        HEADER
      </div>
      <div className='game__body'>
        <canvas className='canv_background'></canvas>
        <canvas className='canv_animate'></canvas>
      </div>
      <div className='game__footer'>
        FOOTER
      </div>
    </>
  )
}

export default Game