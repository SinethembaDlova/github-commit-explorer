import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Repo from './views/Repo';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repos/:username" element={<Repo /> } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
