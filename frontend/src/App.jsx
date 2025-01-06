import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/About'
import Card from './pages/CardGrid'

function App() {
  return (
    <div className="app-container">
      <nav className="nav-menu">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Card />} />
      </Routes>
    </div>
  )
}

export default App