import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import DefaultHome from './pages/Other/DefaultHome';
import GameHome from './pages/Game/GameHome/GameHome';
import GamePlay from './pages/Game/GamePlay/GamePage';

function App() : JSX.Element {
  return (
    <div className="App">
      <div className="main__title" >Hello Pong</div>
      <div className="main__body" ><MainBody /></div>
      <div className='main__footer'>Hello Pong</div>
    </div>
  );
}

export default App;

/*===========================================================================*/

const MainBody = ( ) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<DefaultHome/>}/>
        <Route path='gamehome' element={<GameHome/>} />
        <Route path='ingame/:id' element={<GamePlay/>}/>
      </Routes>
    </BrowserRouter>
  )
}