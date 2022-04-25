import { Routes, Route } from 'react-router-dom'
import { ComicProvider } from '../Context/Comic/ComicProvider';


import { Comics } from '../Pages/comics/comics';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/comics/" element={<ComicProvider><Comics /></ComicProvider>} />
    </Routes>
  )
}