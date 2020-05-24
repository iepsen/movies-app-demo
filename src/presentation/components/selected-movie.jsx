/** @module presentation/components */
import React from 'react'
import css from '../styles/selected-movie.scss'
import { SelectedMovieViewModel } from '../viewmodel/selected-movie'

/**
 * SelectedMovieComponent
 */

const SelectedMovieComponent = ({ movie }) => {
    /**
     * Render the SelectedMovieComponent
     */
    const renderMovie = () => {
        if (movie === null) return null
        const viewModel = new SelectedMovieViewModel(movie).get()

        return (
            <React.Fragment>
                <h1>{viewModel.title}</h1>
                <span>{viewModel.year}</span>
                <span className={css.rating}>{viewModel.rating}</span>
                <span className={css.categories}>{viewModel.categories}</span>
                <time>{viewModel.duration}</time>
                <p>{viewModel.description}</p>
            </React.Fragment>
        )
    }
    
    return (
        <div className={css.movie}>
            {renderMovie()}
        </div>
    )
}

export { SelectedMovieComponent }