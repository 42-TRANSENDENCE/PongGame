//import React, {useEffect, useState}, from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import Home from './pages/Home/Home'
import Game from './pages/Game/Game'

function App() : JSX.Element {
  return (
    <div className="App">
      <div className="main__title" >Hello Pong</div>
        <MainBody />
      <div className='main__footer'>Hello Pong</div>
    </div>
  );
}

export default App;

const MainBody = ( ) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/game' element={<Game/>}/>
      </Routes>
    </BrowserRouter>
  )
}