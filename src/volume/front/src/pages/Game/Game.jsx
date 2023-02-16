import './Game.css'
import React, {useState, useEffect, useRef} from 'react'
import Canvas__background from './Canvas__background';
import Canvas__foreground from './Canvas__foreground';

// const Time = (props) => {
//   const socket = props.socket;
//   const [time, setTime] = useState(0);
  
//   function updateTime(time) {
//     setTime(time);
//   }

//   useEffect( () => {
//     socket.on("time", updateTime);
//     return () => {
//       socket.off("time", updateTime);
//     }
//   }, [])
//   return (
//     <h3>
//       time : {time.toFixed(2)}
//     </h3>
//   )
// }

const Game = ({props}) => {
  const socket = props;
  // const [roomId, setRoomID] = useState(-1);
  let INFO = null;

  const keyPressed = (e) => {
    if (e === "32")
      socket.emit("game_off", INFO);
    else {
      console.log(INFO);
      socket.emit("keypress", INFO, e.keyCode);
    }
  }
  // 서버에 연결된 client의 정보를 주면 서버가 그 정보를 저장하고, broadcast하게 된다.
  // 따라서 처음 인스턴스가 생길 때, 보내준다.
  useEffect ( () => {
    socket.emit("newPlayer", `${socket}`);
    socket.on("game_enter", (playind_info) => {
      console.log("thissss data : ", playind_info);
      INFO = playind_info;
    })
    socket.on("areyouready?", () => {
      // socket.to(roomId).emit("game_on", (roomId));
      socket.emit("game_on", (INFO));
    })
    
      console.log("start");
      document.addEventListener('keydown', keyPressed);
    return () => {
      console.log("END");
      document.removeEventListener('keydown', keyPressed);
    }
  }, [])

  return (
    <>
      <div className='game__body'>
        <div className='game__body_topbar'></div>
        <Canvas__background width="600" height="400"/>
        <Canvas__foreground socket={socket} width="600" height="400"/>
      </div>
    </>
  )
}

export default Game