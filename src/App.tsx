import { useState } from 'react'
// import logo from './logo.svg'
import './App.scss'

import { Md5 } from 'ts-md5/dist/md5';
import { Comics } from './Pages/comics/comics';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes/Routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
