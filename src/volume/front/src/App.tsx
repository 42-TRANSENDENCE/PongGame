//import React, {useEffect, useState}, from 'react'
import * as React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {io, Socket} from 'socket.io-client'

import './App.css';
import Home from './pages/Home/Home'
import Game from './pages/Game/Game'


const MainBody = ({socket, arg} : any) : JSX.Element => {
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

const socket = io("http://localhost:3001");
function App() : JSX.Element {

  const [userNo, setUserNo] = React.useState(0);

  function handleEnterance (data : any) {
    console.log("userno : ", data);
    setUserNo(data);
  };

  React.useEffect ( () => {
    socket.on("enterance", handleEnterance);
    socket.on("key_check", handleEnterance);
    return () => {
      socket.off("enterance", handleEnterance);
    }
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
