import './styles/GameHome.css'
import { io } from 'socket.io-client'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FriendList from './components/FriendList'
import PlayerProfile from './components/PlayerProfile'
import JoinButton from './components/JoinButton'
import { GameContext } from '../../../contexts/GameSocket'

enum GameHomeState {
  Default,
  Wating
}


const GameHome = ( ) : JSX.Element => {
  const game_socket = useContext(GameContext);
  const [state, SetState] = useState(GameHomeState.Default);
  const navigate = useNavigate();

  useEffect(() => {
      console.log("게암 홈 들어옴.");
      game_socket.connect();
      game_socket.on("in_the_queue", () => {
        SetState(GameHomeState.Wating);
      });
      game_socket.on("out_of_queue", () => {
        SetState(GameHomeState.Default);
      });

      game_socket.on("enter_to_game", () => {
        navigate('../ingame/:12');
      })

      return () => {
        game_socket.off("in_the_queue");
        game_socket.off("out_of_queue");
        game_socket.disconnect();
        console.log("게암 홈 나감.");
      }
  }, [])

  return (
    <div className='home__container'>

      <div className='home__left'>
        <FriendList
          socket={game_socket}
          iswaiting={(state === GameHomeState.Wating)?true:false}
        />
      </div>
      
      <div className='home__seperator'/>
      
      <div className='home__right'>
        <PlayerProfile/>
        <div className='sperator'/>
        <JoinButton 
          socket={game_socket}
          iswaiting={(state === GameHomeState.Wating)?true:false}
        />
      </div>
    </div>
  )
}

export default GameHome

