import '../styles/JoinButton.css'
import { Socket } from 'socket.io-client'

const JoinButton = (props : any) => {
  const socket : Socket = props.socket;
  const iswaiting : boolean = props.iswaiting;

  function join_clicked () {
    if (iswaiting) {
      socket.emit("quit_queue");
      console.log("취소 버튼 누름");
    } else {
      socket.emit("join_queue");
      console.log("게임 시작 버튼 누름");
    }
  }
  
  return (
      <div className='joinbutton' onClick={join_clicked} >
        { (iswaiting) ? <p>Cancel</p> : <p>Join Game</p> }
      </div>
  )
}

export default JoinButton
