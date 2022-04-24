import { useState } from 'react'
// import logo from './logo.svg'
import './App.scss'

import { Md5 } from 'ts-md5/dist/md5';
import { Comics } from './Pages/comics/comics';

function App() {
  const apikey = import.meta.env.VITE_API_PUBLIC_KEY
  const privateKey = import.meta.env.VITE_API_KEY

  const ts = Math.floor(Date.now() / 1000);
  const hash = Md5.hashStr(ts + privateKey + apikey);


  /* console.log('TS:', ts);
  console.log('apikey:', apikey);
  console.log('PRIVATE:', privateKey);
  console.log('HASH:', hash) */
  return (
    <div className="App">
      <Comics />
    </div>
  )
}

export default App
