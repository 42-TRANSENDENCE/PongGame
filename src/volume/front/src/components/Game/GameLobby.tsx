import '../../styles/Game/GameLobby.css'
import { useEffect } from 'react'
import FriendList from './FriendList'
import PlayerProfile from './PlayerProfile'
import JoinButton from './JoinButton'

export const GameLobby = (props : any) => {
  const game_socket = props.socket;

  useEffect(() => {
    console.log("GameLobby 입장");
    return () => {
      console.log("GameLobby 나감");
    }
  }, [])

  return (
    <div className='home__container'>

      <div className='home__left'>
        <FriendList
          socket={game_socket}
        />
      </div>
      
      <div className='home__seperator'/>
      
      <div className='home__right'>
        <PlayerProfile/>
        <div className='sperator'/>
        <JoinButton 
          socket={game_socket}
        />
      </div>
    </div>
  )
}
