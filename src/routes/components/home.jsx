import React from 'react'
import { MoviesInteractor } from '../../domain/movies-interactor'
import { MovieListComponent } from '../../presentation/components/movie-list'
import { SelectedMovieComponent } from '../../presentation/components/selected-movie'
import css from '../styles/home.scss'

export class HomeRouteComponent extends React.Component {
    
    constructor(props) {
        super(props)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onChoose = this.onChoose.bind(this)
        this.movieListRef = React.createRef()
        this.interactor = new MoviesInteractor()
        this.state = {
            featuredMovies: null,
            selectedMovie: null,
            watchedMovies: null,
            featuredMoviesHasFocus: true,
            watchedMoviesHasFocus: false
        }
    }

    componentWillMount() {
        this.interactor.get()
            .then(featuredMovies => {
                this.setState({featuredMovies})
                this.getWatchedMovies(featuredMovies)
            })
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown)
    }

    getWatchedMovies(movies) {
        let watchedMovies = movies.filter(movie => movie.progress > 0)
        this.setState({watchedMovies})
    }

    onKeyDown(event) {
        switch(event.keyCode) {
        case 40:
            this.setState({
                featuredMoviesHasFocus: false,
                watchedMoviesHasFocus: true
            })
            break
        case 38:
            this.setState({
                featuredMoviesHasFocus: true,
                watchedMoviesHasFocus: false
            })
            break
        }
    }

    onSelect(movie) {
        if (this.state.selectedMovie === movie) return
        this.setState({selectedMovie: movie})
    }

    onChoose() {
        this.props.history.push(this.state.selectedMovie.getLink(), {movie: this.state.selectedMovie})
    }

    render() {

        if (this.state.movies === null) return null

        return (
            <div className={css.container}>

                <div className={css.selected__movie}>
                    <SelectedMovieComponent 
                        movie={this.state.selectedMovie} 
                    />
                </div>
                <div ref={this.movieListRef} className={css.movies__list}>
                    <div>
                        <MovieListComponent
                            hasFocus={this.state.featuredMoviesHasFocus} 
                            title={'Featured Movies'} 
                            movies={this.state.featuredMovies} 
                            onSelect={this.onSelect} 
                            onChoose={this.onChoose} 
                        />
                        <MovieListComponent 
                            hasFocus={this.state.watchedMoviesHasFocus}
                            title={'Watched Movies'} 
                            movies={this.state.watchedMovies} 
                            onSelect={this.onSelect} 
                            onChoose={this.onChoose} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}