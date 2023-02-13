import './Home.css'
import React, { useState, useEvent } from 'react'
import { Link } from 'react-router-dom';

const RoomList = (props) => {
  const {socket} = props;
  const [roomlist, setRoomList] = useState([ 
    {
      id: "#1234",
      name: "ROOM1",
      count: 1,
    },
    {
      id: "#1235",
      name: "ROOM2",
      count: 2,
    }
  ]);

  const getRoomList = () => {
    console.log("refresh clicked");
    //socket.emit("get_roomlist", roomlist);
    //여기서 get요청 보내고 싶음.
  }

  const createNewRoom = () => {
    console.log("make new room clicked");
  }

  //useEvent ()
  return (
    <div className='room_list__container'>
      
      <div className='room_list__header'>
        <h5>List</h5>
        <button onClick={getRoomList}>refresh</button>
      </div>
      <div className='line'></div>
      
      {
        (roomlist.length === 0) ? (
          <h2>No available room</h2>
        ) : (
          <>
            <h2>Available rooms</h2>
            <ul className="room_list">
              <li className='room_info'>
                <div>{roomlist[0].name}</div>
                <div>({roomlist[0].count}/2)</div>
                {
                  (roomlist[0].count < 2) ?
                    (
                      <Link to='/game' className='joinbutton'>
                        <button >Join</button>
                      </Link>
                    ) : (
                      <Link className='joinbutton'>
                        <button diabled>Full</button>
                      </Link>
                    )
                }
              </li>
              <li className='room_info'>
                <div>{roomlist[1].name}</div>
                <div>({roomlist[1].count}/2)</div>
                {
                  (roomlist[1].count < 2) ?
                    (
                      <Link to='/game' className='joinbutton'>
                        <button >Join</button>
                      </Link>
                    ) : (
                      <Link className='joinbutton'>
                        <button disabled>Full</button>
                      </Link>
                    )
                }
              </li>
            </ul>
          </>
        )
      }

      <div className='line'></div>
      <div className="creat_room">
        <input type="text" required placeholder="room name" />
        <button className='create_room__botton' onClick={createNewRoom}>
          Create
        </button>
      </div>

    </div>
  )
}

export default RoomList