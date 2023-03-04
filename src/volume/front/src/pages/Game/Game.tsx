import {useState, useContext, useEffect} from 'react'
import { GameContext } from '../../contexts/GameSocket';
import { GameState } from '../../components/Game/enums';
import { GameLobby } from '../../components/Game/GameLobby';
import { GameWaiting } from '../../components/Game/GameWaiting';
import { GamePlay } from '../../components/Game/GamePlay';

const Game = () : JSX.Element => {
  const [gamestate, setGamestate] = useState(GameState.Lobby);
  const [room, setRoom] = useState(null);
  const socket = useContext(GameContext);

  useEffect(() => {
    console.log(" [ RENDERING ] : game page : ")
    socket.emit("lobby_initialize");
    return () => {
      socket.emit("lobby_terminate")
      socket.emit("quit_queue");
      console.log(" [ STOP ] : game page")
    }
  }, [])

  useEffect(() => {
    socket.on("joined_to_queue", () => {
      console.log("qeueue");
      setGamestate(GameState.Waiting);
    });
    socket.on("out_of_queue", () => {
      setGamestate(GameState.Lobby);
    })
    socket.on("enter_to_game", (roomId) => {
      setRoom(roomId)
      console.log("room :",room, roomId);
      setGamestate(GameState.InGame);
    })
    return () => {
      socket.off("joined_to_queue");
      socket.off("out_of_queue");
      socket.off("enter_to_game");
    }
  }, [])

  switch (gamestate) {
    case GameState.Lobby :
      return (<GameLobby socket={socket}/>);
    case GameState.Waiting :
      return (<GameWaiting socket={socket}/>);
    case GameState.InGame :
      return (<GamePlay socket={socket} roomId={room} setGamestate={setGamestate}/>);
    default :
      return (<>ERROR</>)
  }
}

export default Game