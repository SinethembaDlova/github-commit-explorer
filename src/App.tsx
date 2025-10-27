import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repos/:username" element={<h1>Sinethemba</h1> } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
