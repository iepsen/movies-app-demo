import React from 'react'
import { MoviesInteractor } from '../../domain/movies-interactor'
import { MovieListComponent } from '../../presentation/components/movie-list'
import { SelectedMovieComponent } from '../../presentation/components/selected-movie'
import { LoadingComponent } from '../../presentation/components/loading'
import css from '../styles/home.scss'

export class HomeRouteComponent extends React.Component {
    
    constructor(props) {
        super(props)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onSelectMovie = this.onSelectMovie.bind(this)
        this.onChoose = this.onChoose.bind(this)
        this.onMount = this.onMount.bind(this)
        this.movieListRef = React.createRef()
        this.moviesListRefMap = new Map()
        this.currentListItemIndex = 0
        this.interactor = new MoviesInteractor()
        this.state = {
            selectedMovie: null,
            moviesListFocusIndex: 0,
            moviesList: []
        }
    }

    componentWillMount() {
        this.interactor.get()
            .then(featuredMovies => {
                this.pushMovieList('Featured Movies', featuredMovies)
                this.getWatchedMovies(featuredMovies)
            })
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
    }

    pushMovieList(title, movieList) {
        let moviesList = this.state.moviesList
        moviesList.push({title, movieList})
        this.setState({moviesList})
    }

    getWatchedMovies(movies) {
        let watchedMovies = movies.filter(movie => movie.progress > 0)
        if (watchedMovies.length === 0) return
        this.pushMovieList('Watched Movies', watchedMovies)
    }

    onKeyDown(event) {
        switch(event.keyCode) {
        case 38:
            this.onNavigateUp()
            this.update()
            break

        case 40:
            this.onNavigateDown()
            this.update()
            break
        }
    }

    update() {
        let order
        for (const [key, value] of this.moviesListRefMap.entries()) {
            order = key + (this.moviesListRefMap.size - this.currentListItemIndex)
            if (this.currentListItemIndex > key) {
                order += 1
            } else {
                order = (order - this.moviesListRefMap.size) + 1
            }
            value.current.style = `order: ${order}`
        }
        
        this.setState({
            moviesListFocusIndex: this.currentListItemIndex
        })
    }

    onNavigateUp() {
        const index = this.currentListItemIndex - 1
        this.currentListItemIndex = (this.moviesListRefMap.has(index)) ? index : this.moviesListRefMap.size - 1
    }

    onNavigateDown() {
        const index = this.currentListItemIndex + 1
        this.currentListItemIndex = (this.moviesListRefMap.has(index)) ? index : 0
    }

    onSelectMovie(movie) {
        if (this.state.selectedMovie === movie) return
        this.setState({selectedMovie: movie})
    }

    onChoose() {
        this.props.history.push(this.state.selectedMovie.getLink(), {movie: this.state.selectedMovie})
    }

    onMount(index, ref) {
        this.moviesListRefMap.set(index, ref)
    }

    renderMoviesList() {
        return this.state.moviesList.map((movieListItem, index) => {
            return <MovieListComponent
                key={index}
                index={index}
                hasFocus={this.state.moviesListFocusIndex === index ? true : false}
                title={movieListItem.title} 
                movies={movieListItem.movieList} 
                onMount={this.onMount}
                onSelect={this.onSelectMovie} 
                onChoose={this.onChoose} 
            />
        })
    }

    render() {

        if (this.state.moviesList.length === 0) {
            return <LoadingComponent />
        }

        return (
            <div className={css.container}>

                <div className={css.selected_movie}>
                    <SelectedMovieComponent movie={this.state.selectedMovie} />
                </div>
                <div ref={this.movieListRef} className={css.movies_list}>
                    {this.renderMoviesList()}
                </div>
            </div>
        )
    }
}