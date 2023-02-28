import './GamePage.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Canvas__background from './Canvas__background';
import Canvas__foreground from './Canvas__foreground';
import { io } from 'socket.io-client'

const GamePage = ( ) : JSX.Element => {
  //socket을 클래스 밖에서 정의하면 왜인지 모르겠지만, 처음 웹 페이지에 접속하면 소켓이 한 번 connect된다.
  const game_socket = io("localhost:3001/ingame", {
                          transports:["websocket"],
                        });
  let game_basic_info : any = null;
  const canv_width = "1800";
  const canv_height = "1200";
  
  const keyPressed = (e : KeyboardEvent) => {
    console.log(e.code);
    if(["ArrowUp","ArrowDown"].indexOf(e.code) > -1) { 
      game_socket.emit("keypress", e.code);
    } 
  }
  
  // 서버에 연결된 client의 정보를 주면 서버가 그 정보를 저장하고, broadcast하게 된다.
  // 따라서 처음 인스턴스가 생길 때, 보내준다.
  // https://snupi.tistory.com/195 <- 새로고침 방지
  // 따라했는데 경고창만 뜨고 안 됨.
  useEffect ( () => {
    console.log("게암 페이지 들어옴");
    window.addEventListener("keydown", default_keyoff);
    window.addEventListener("beforeunload", refresh_off);
    game_socket.connect();
    game_socket.on("game_enter", (info : any) => { 
      game_basic_info = info;
      console.log("none ", game_basic_info);
    })
    
    document.addEventListener('keydown', keyPressed);
    return () => {
      window.removeEventListener("keydown", default_keyoff);
      window.removeEventListener("beforeunload", refresh_off);
      document.removeEventListener('keydown', keyPressed);
      game_socket.disconnect();
      console.log("게암 페이지 나감");
    }
  }, [])

  return (
    <>
      <div className='game__body'>
        <div className='container__canvas'>
          <Canvas__background socket={game_socket} width={canv_width} height={canv_height} color="red"/>
          <Canvas__foreground socket={game_socket} width={canv_width} height={canv_height}/>
        </div>
        <Link to='/gamehome' className='quit_button' onClick={quit_game}>
          <p>나가기</p>
        </Link>
      </div>
    </>
  )
}

export default GamePage;

/*===========================================================================*/

function default_keyoff( e : KeyboardEvent ) : void {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) { 
    e.preventDefault();
    e.stopPropagation();
  } 
}

function refresh_off(e : BeforeUnloadEvent) {
  e.preventDefault();
  e.returnValue = '';
}

function quit_game () {
  alert("나가?");
}
