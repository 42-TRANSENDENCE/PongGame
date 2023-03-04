import React from 'react';
import loadable from '@loadable/component';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const LogIn = loadable(() => import('../../pages/LogIn/LogIn'));
const SignUp = loadable(() => import('../../pages/SignUp/SignUp'));
const Home = loadable(() => import('../Home/Home'));
const Chat = loadable(() => import('../../pages/Chat/Chat'));
const Game = loadable(() => import('../../pages/Game/Game'));
const TwoFactor = loadable(() => import('../../pages/TwoFactor/TwoFactor'));
// const LogIn = loadable(() => import('@ pages/LogIn'));
// const Home = loadable(() => import('@layouts/Home'));

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/twofactor" element={<TwoFactor />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
