import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { LiveProject } from './pages/LiveProject'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<LiveProject />} />
    </Routes>
  )
}

export default App
