import './styles/GameHome.css'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FriendList from './components/FriendList'
import PlayerProfile from './components/PlayerProfile'
import JoinButton from './components/JoinButton'

enum GameHomeState {
  Default,
  Wating
}

const gamehome_socket = io("localhost:3001/gamehome", {
                          transports:["websocket"],
                        });

const GameHome = ( ) : JSX.Element => {
  const [state, SetState] = useState(GameHomeState.Default);

  useEffect(() => {
      console.log("게암 홈 들어옴.");
      gamehome_socket.connect();
      gamehome_socket.on("in_the_queue", () => {
        SetState(GameHomeState.Wating);
      });
      gamehome_socket.on("out_of_queue", () => {
        SetState(GameHomeState.Default);
      });

      gamehome_socket.on("enter_to_game", () => {
        navigate('../ingame/:12');
      })

      return () => {
        gamehome_socket.off("in_the_queue");
        gamehome_socket.off("out_of_queue");
        gamehome_socket.disconnect();
        console.log("게암 홈 나감.");
      }
  }, [])

  return (
    <div className='home__container'>

      <div className='home__left'>
        <FriendList
          socket={gamehome_socket}
          iswaiting={(state === GameHomeState.Wating)?true:false}
        />
      </div>
      
      <div className='home__seperator'/>
      
      <div className='home__right'>
        <PlayerProfile/>
        <div className='sperator'/>
        <JoinButton 
          socket={gamehome_socket}
          iswaiting={(state === GameHomeState.Wating)?true:false}
        />
      </div>
    </div>
  )
}

export default GameHome

