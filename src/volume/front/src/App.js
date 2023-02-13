import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import io from 'socket.io-client'

import './App.css';
import Home from './pages/Home/Home'
import Game from './pages/Game/Game'


const socket = io.connect("http://10.18.246.246:3001");
function App() {

  const [userNo, setUserNo] = useState(0);

  useEffect ( () => {
    socket.on("enterance", (data) =>{
      if (data === 0) {
        alert(`TOO MANY USERS`);
      } else {
        setUserNo(data);
      }
    })
  })

  return (
    <div className="App">
      <div className="main__title" >Hello Pong</div>
      {
        (userNo === 0) ? (
          <h2>TOO MANY USERS</h2>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home props={socket}/>}/>
              <Route path='/game' element={<Game props={socket}/>}/>
            </Routes>
          </BrowserRouter>
        )
      }
      
      <div className='main__footer'>Hello Pong</div>
    </div>
  );
}

export default App;
