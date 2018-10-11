import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomeRouteComponent, PlayerRouteComponent } from './routes'
import './routes/styles/global.scss'

class Application extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomeRouteComponent} />
                    <Route exact path="/player/:id" component={PlayerRouteComponent} />
                </Switch>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Application />, document.getElementById('root'))