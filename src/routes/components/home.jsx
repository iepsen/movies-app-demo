/** @module presentation/routes */
import React from 'react'
import { MoviesInteractor } from '../../domain/movies-interactor'
import { MovieListComponent } from '../../presentation/components/movie-list'
import { SelectedMovieComponent } from '../../presentation/components/selected-movie'
import { LoadingComponent } from '../../presentation/components/loading'
import { deviceManager } from '../../manager/device-manager'
import orderListMap from '../../helpers/order-list-map'
import animateList from '../../helpers/animate-list'
import css from '../styles/home.scss'

/**
 * HomeRouteComponent
 */
export class HomeRouteComponent extends React.Component {
    
    /**
     * Initialize the HomeRouteComponent 
     * @param {React.Props} props - The component props
     */
    constructor(props) {
        super(props)
        this.onKeyUp = this.onKeyUp.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.setFocus = this.setFocus.bind(this)
        this.onMountMovieList = this.onMountMovieList.bind(this)
        this.moviesListRef = React.createRef()
        this.moviesListRefMap = new Map()
        this.interactor = new MoviesInteractor()
        
        this.state = {
            focusedMovie: null,
            focusedListIndex: 0,
            lists: []
        }
    }

    componentWillMount() {
        this.interactor.get()
            .then(featuredMovies => {
                this.pushStateMovieList('Featured Movies', featuredMovies)
                this.getWatchedMovies(featuredMovies)
            })
    }

    componentDidMount() {
        deviceManager.subscribe(deviceManager.KEY_UP, this.onKeyUp)
        deviceManager.subscribe(deviceManager.KEY_DOWN, this.onKeyDown)
    }

    componentWillUnmount() {
        deviceManager.unsubscribe(deviceManager.KEY_UP)
        deviceManager.unsubscribe(deviceManager.KEY_DOWN)
    }

    /**
     * Dispatch on user press up key
     */
    onKeyUp() {
        this.navigateUp()
    }

    /**
     * Dispatch on user press down key
     */
    onKeyDown() {
        this.navigateDown()
    }

    /**
     * Set the MovieListComponent on the Map References
     * when mounted
     * @param {number} index - The MovieListComponent index
     * @param {React.Ref} ref - The MovieListComponent Reference
     */
    onMountMovieList(index, ref) {
        this.moviesListRefMap.set(index, ref)
    }

    /**
     * Called when a movie is selected
     */
    onSelect() {
        this.props.history.push(this.state.focusedMovie.getLink(), {movie: this.state.focusedMovie})
    }

    /**
     * Called when a movie has focus
     * @param {MovieEntity} movie - The focused movie
     */
    onFocus(movie) {
        if (this.state.focusedMovie === movie) return
        this.setState({focusedMovie: movie})
    }

    /**
     * Set focus on a reordered MovieListComponent
     */
    setFocus() {
        orderListMap(this.moviesListRefMap, this.state.focusedListIndex)
    }

    /**
     * Discover the previous MovieListComponent and navigate to it
     */
    navigateUp() {
        const nextIndex = this.getListIndex() - 1
        this.setListIndex(this.moviesListRefMap.has(nextIndex) ? nextIndex : this.moviesListRefMap.size - 1)
        animateList(this.moviesListRef.current, css.slide__up, this.setFocus)
    }

    /**
     * Discover the next MovieListComponent and navigate to it
     */
    navigateDown() {
        const nextIndex = this.getListIndex() + 1
        this.setListIndex(this.moviesListRefMap.has(nextIndex) ? nextIndex : 0)
        animateList(this.moviesListRef.current, css.slide__down, this.setFocus)
    }

    /**
     * Get the index of selected MovieListComponent
     */
    getListIndex() {
        return this.state.focusedListIndex
    }

    /**
     * Set the current MovieListComponent selected to the state
     * @param {number} focusedListIndex - Index of focused list
     */
    setListIndex(focusedListIndex) {
        this.setState({focusedListIndex})
    }

    /**
     * Push the MovieListComponent to the state
     * @param {string} title - The MovieListComponent title.
     * @param {Array} movieList - The MovieListComponent items.
     */
    pushStateMovieList(title, movieList) {
        let lists = this.state.lists
        lists.push({title, movieList})
        this.setState({lists})
    }

    /**
     * The MovieEntity array to search for watched movies
     * @param {Array} movies - MovieEntity array.
     */
    getWatchedMovies(movies) {
        let watchedMovies = movies.filter(movie => movie.progress > 0)
        if (watchedMovies.length === 0) return
        this.pushStateMovieList('Watched Movies', watchedMovies)
    }

    /**
     * Render the MovieListComponent array
     */
    renderLists() {
        return this.state.lists.map((list, index) =>
            <MovieListComponent
                key={index}
                index={index}
                hasFocus={this.getListIndex() === index}
                title={list.title} 
                movies={list.movieList} 
                onMount={this.onMountMovieList}
                onSelect={this.onSelect} 
                onFocus={this.onFocus} 
            />
        )
    }

    render() {
        if (this.state.lists.length === 0) {
            return <LoadingComponent />
        }

        return (
            <div className={css.container}>
                <div className={css.selected__movie}>
                    <SelectedMovieComponent movie={this.state.focusedMovie} />
                </div>
                <div ref={this.moviesListRef} className={css.movies__list}>
                    {this.renderLists()}
                </div>
            </div>
        )
    }
}