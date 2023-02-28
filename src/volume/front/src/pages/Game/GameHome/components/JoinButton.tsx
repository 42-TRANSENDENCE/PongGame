import '../styles/JoinButton.css'
import { Navigate } from 'react-router-dom';

const JoinButton = () => {
  return (
    <Navigate to="/ingame" className='joinbutton' onClick={join_clicked} replace={true} />
      <p>Join Game</p>
    </Navigate>
  )
}

export default JoinButton

function join_clicked () {
  console.log("게임 시작 버튼 누름");
}