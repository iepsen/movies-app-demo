import { createRoot } from 'react-dom/client'

import { HashRouter, Route, Routes } from 'react-router-dom'
import { Home, Movie, Video, Show } from './views'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/show/:id" element={<Show />} />
        <Route path="/video/:id" element={<Video />} />
      </Routes>
    </HashRouter>
  )
}

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
