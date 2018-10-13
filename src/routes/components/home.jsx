import React from 'react'
import { MoviesInteractor } from '../../domain/movies-interactor'
import { MovieListComponent } from '../../presentation/components/movie-list'
import { SelectedMovieComponent } from '../../presentation/components/selected-movie'
import css from '../styles/home.scss'

export class HomeRouteComponent extends React.Component {
    
    constructor(props) {
        super(props)
        this.onSelect = this.onSelect.bind(this)
        this.onChoose = this.onChoose.bind(this)
        this.interactor = new MoviesInteractor()
        this.state = {
            movies: null,
            selectedMovie: null,
            watchedMovies: null
        }
    }

    componentWillMount() {
        this.interactor.get()
            .then(movies => this.setState({movies}), this.getWatchedMovies())
    }

    getWatchedMovies() {
        this.interactor.getWatchedMovies()
            .then(watchedMovies => this.setState({watchedMovies}))
    }

    onSelect(movie) {
        this.setState({selectedMovie: movie})
    }

    onChoose() {
        this.props.history.push(this.state.selectedMovie.getLink(), {movie: this.state.selectedMovie})
    }

    render() {

        if (this.state.movies === null) return null

        return (
            <div className={css.container}>
                <SelectedMovieComponent 
                    movie={this.state.selectedMovie} 
                />

                <MovieListComponent 
                    hasFocus={true} 
                    title={'Featured Movies'} 
                    movies={this.state.movies} 
                    onSelect={this.onSelect} 
                    onChoose={this.onChoose} 
                />

                <MovieListComponent 
                    title={'Watched Movies'} 
                    movies={this.state.watchedMovies} 
                    onSelect={this.onSelect} 
                    onChoose={this.onChoose} 
                />
            </div>
        )
    }
}