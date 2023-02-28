import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import '../styles/FriendList.css'

const SingleFriend = (props : any) : JSX.Element => {
  const socket : Socket = props.socket;
  const on : boolean = props.ison;
  const name : string = props.name;
  const ingame : boolean = props.ingame;

  function button_clicked () : void {
    if (ingame === true) {
      console.log("관전 하기");
      socket.emit("watch", name);
    } else {
      console.log("게임 하기");
      socket.emit("invite", name);
    }
  }

  return (
    <div className='single_friend'>
      <img src="https://placeimg.com/50/50/people" alt="profile" />
      <span>{name}</span>
      {
        (on === false) ? 
          ( <div className='cover' ></div> ) 
          : 
          (
            <button onClick={button_clicked}>
            {(ingame === true) ? ("관전하기") : ("게임하기")}
            </button>
          ) 
      }
    </div>
  );
}

const FriendList = ( props : any ) : JSX.Element => {
  const socket : Socket = props.socket;
  useEffect(() => {
    console.log("여기서 DB에 친구 리스트 GET 요철")
    return () => {
    }
  }, []);
  
  return (
    <div className='container__friendlist'>
      <SingleFriend socket={socket} ison={true} name="user1" ingame={false}/>
      <SingleFriend socket={socket} ison={true} name="user2" ingame={true}/>
      <SingleFriend socket={socket} ison={true} name="user3" ingame={false}/>
      <SingleFriend socket={socket} ison={true} name="user4" ingame={true}/>
      <SingleFriend socket={socket} ison={true} name="user5" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user6" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user7" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user8" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user9" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user10" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user11" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user12" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user13" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user14" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user15" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user16" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user17" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user18" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user19" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user20" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user21" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user22" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user23" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user24" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user25" ingame={false}/>
      <SingleFriend socket={socket} ison={false} name="user26" ingame={false}/>
    </div>
  );
}

export default FriendList