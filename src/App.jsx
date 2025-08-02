import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Game from './pages/Game/Game';
import Final from './pages/Final/Final';
import './styles/App.css';

function App() {
  return (
    <Router basename="/sorpresa">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/final" element={<Final />} />
      </Routes>
    </Router>
  );
}

export default App;
