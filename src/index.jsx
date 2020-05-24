import React from 'react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'
import { HashRouter, Route } from 'react-router-dom'
import { HomeRouteComponent, MovieRouteComponent } from './routes'
import './routes/styles/global.scss'

const Application = () => {
    const history = useHistory()
    return (
        <HashRouter>
            <Route exact path="/" component={HomeRouteComponent} />
            <Route exact path="/movie/:id" component={MovieRouteComponent} />
        </HashRouter>
    )
}

ReactDOM.render(<Application />, document.getElementById('root'))