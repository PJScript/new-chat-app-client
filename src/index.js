import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import Chat from './pages/chat'
import Admin from './pages/admin'
import Block from './pages/adminBlock'
import Header from './components/header';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './style/GlobalStyle';
import Signup from './pages/signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <GlobalStyle />
  <Header />

    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/block" element={<Block />}></Route>

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
