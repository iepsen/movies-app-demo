import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import { HomeRouteComponent, MovieRouteComponent } from './routes'
import './routes/styles/global.scss'

class Application extends React.Component {
    constructor(props) {
        super(props)
        this.history = createBrowserHistory()
    }
    render() {
        return (
            <BrowserRouter>
                <Router history={this.history}>
                    <Switch>
                        <Route exact path="/" component={HomeRouteComponent} />
                        <Route exact path="/movie/:id" component={MovieRouteComponent} />
                    </Switch>
                </Router>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Application />, document.getElementById('root'))