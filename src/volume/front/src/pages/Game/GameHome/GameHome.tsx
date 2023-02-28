import './styles/GameHome.css'
import { useEffect, useRef } from 'react'
import FriendList from './components/FriendList'
import PlayerProfile from './components/PlayerProfile'
import JoinButton from './components/JoinButton'
import { io } from 'socket.io-client'

const GameHome = ( ) : JSX.Element => {
  const gamehome_socket = io("localhost:3001/gamehome", {
                            transports:["websocket"],
                          });
  useEffect(() => {
      console.log("게암 홈 들어옴.");
      return () => {
      gamehome_socket.disconnect();
      console.log("게암 홈 나감.");
    }
  })

  return (
    <div className='home__container'>

      <div className='home__left'>
        <FriendList/>
      </div>
      
      <div className='home__seperator'/>
      
      <div className='home__right'>
        <PlayerProfile/>
        <div className='sperator'/>
        <JoinButton/>
      </div>

    </div>
  )
}

export default GameHome

