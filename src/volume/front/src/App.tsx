import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {gameSocket, GameContext} from './contexts/GameSocket'
import DefaultHome from './pages/Other/DefaultHome';
import Game from './pages/Game/Game';

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
    <>
      <GameContext.Provider value={gameSocket}>      
        <BrowserRouter>
          <Routes>
            <Route path='' element={<DefaultHome/>}/>
            <Route path='game' element={<Game/>} />
          </Routes>
        </BrowserRouter>
      </GameContext.Provider>
    </>
  )
}