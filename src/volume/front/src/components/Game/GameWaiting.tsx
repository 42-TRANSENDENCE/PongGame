import '../../styles/Game/GameWaiting.css'
import { useEffect } from 'react'

export const GameWaiting = (props : any) => {
  const game_socket = props.socket;

  function quit_queue() : void {
    game_socket.emit("quit_queue");
  }

  useEffect(() => {
    console.log("queue에 들어옴")
    return () => {
      console.log("queue에서 나감.")
    }
  }, [])

  return (
    <div className='waiting__container'>
      <img src='spinner.gif'/>
      <div className='cancel_button' onClick={quit_queue}>
        <p className='cancel'>Cancel</p>
      </div>
    </div>
  )
}