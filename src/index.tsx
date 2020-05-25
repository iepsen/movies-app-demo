import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import Home from './views/Home';
import Details from './views/Details';
import Player from './views/Player';

const App = () => {
  return (
    <HashRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/details/:id" component={Details} />
      <Route exact path="/player/:id" component={Player} />
    </HashRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
