/** @module presentation/components */
import React from 'react'
import css from '../styles/selected-movie.scss'
import { SelectedMovieViewModel } from '../viewmodel/selected-movie'

/**
 * SelectedMovieComponent
 */
export class SelectedMovieComponent extends React.Component {
    /**
     * Render the SelectedMovieComponent
     */
    renderMovie() {
        if (this.props.movie === null) return null
        this.viewModel = new SelectedMovieViewModel(this.props.movie).get()

        return (
            <React.Fragment>
                <h1>{this.viewModel.title}</h1>
                <span>{this.viewModel.year}</span>
                <span className={css.rating}>{this.viewModel.rating}</span>
                <span className={css.categories}>{this.viewModel.categories}</span>
                <time>{this.viewModel.duration}</time>
                <p>{this.viewModel.description}</p>
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