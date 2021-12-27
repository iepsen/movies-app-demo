import ReactDOM from 'react-dom'
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

ReactDOM.render(<App />, document.getElementById('root'))
