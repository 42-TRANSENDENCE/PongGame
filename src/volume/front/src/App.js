import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import io from 'socket.io-client'

import './App.css';
import Home from './pages/Home/Home'
import Game from './pages/Game/Game'


const MainBody = ({socket, arg}) => {
  if (arg === -1)
    return (
      <div>
        <h1>Conncetion Refused</h1>
        <h4>TOO MANY USERS</h4>
      </div>
    )
  else
    return (
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Home props={socket}/>}/> */}
          <Route path='/' element={<Game props={socket}/>}/>
        </Routes>
      </BrowserRouter>
    )
}

const socket = io.connect("http://localhost:3001");
function App() {

  const [userNo, setUserNo] = useState(0);

  useEffect ( () => {
    socket.on("enterance", (data) =>{
      setUserNo(data);
    })
  }, [])

  return (
    <div className="App">
      <div className="main__title" >Hello Pong</div>
      <MainBody arg={userNo} socket={socket}/>
      <div className='main__footer'>Hello Pong</div>
    </div>
  );
}

export default App;
