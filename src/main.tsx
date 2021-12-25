import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { Home, Movie, Video, Show } from './views'

const App = () => {
  return (
    <HashRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/movie/:id" component={Movie} />
      <Route exact path="/show/:id" component={Show} />
      <Route exact path="/video/:id" component={Video} />
    </HashRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
