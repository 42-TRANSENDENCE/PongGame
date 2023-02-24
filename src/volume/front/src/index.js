import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 방향키 입력 시 브라우저가 스크롤 되지 않도록 하는 코드.
window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
    e.preventDefault();
    }
  }, false
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

reportWebVitals();
