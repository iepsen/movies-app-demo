import React from 'react'
import css from '../styles/selected-movie.scss'

export class SelectedMovieComponent extends React.Component {
    renderMovie() {
        if (this.props.movie === null) return null
        return (
            <React.Fragment>
                <h1>{this.props.movie.title}</h1>
                <p>{this.props.movie.description}</p>
            </React.Fragment>
        )
    }
    render() {
        return (
            <div className={css.movie}>
                {this.renderMovie()}
            </div>
        )
    }
}