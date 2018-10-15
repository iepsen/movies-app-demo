import React from 'react'
import { MoviesInteractor } from '../../domain/movies-interactor'
import { MovieListComponent } from '../../presentation/components/movie-list'
import { SelectedMovieComponent } from '../../presentation/components/selected-movie'
import { LoadingComponent } from '../../presentation/components/loading'
import { deviceManager } from '../../manager/device-manager'
import orderListMap from '../../helpers/order-list-map'
import css from '../styles/home.scss'

export class HomeRouteComponent extends React.Component {
    
    constructor(props) {
        super(props)
        this.onKeyUp = this.onKeyUp.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.onMount = this.onMount.bind(this)
        this.listsRef = React.createRef()
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

    onKeyUp() {
        this.navigateUp()
    }

    onKeyDown() {
        this.navigateDown()
    }

    navigateUp() {
        const index = this.state.focusedListIndex - 1
        this.setState({
            focusedListIndex: this.moviesListRefMap.has(index) ? index : this.moviesListRefMap.size - 1
        })
        this.listsRef.current.classList.add(css.slide__up)
        this.listsRef.current.addEventListener('animationend', () => {
            this.listsRef.current.classList.remove(css.slide__up)
            this.setFocus()
        })
    }

    navigateDown() {
        const index = this.state.focusedListIndex + 1
        this.setState({
            focusedListIndex: this.moviesListRefMap.has(index) ? index : 0
        })
        this.listsRef.current.classList.add(css.slide__down)
        this.listsRef.current.addEventListener('animationend', () => {
            this.listsRef.current.classList.remove(css.slide__down)
            this.setFocus()
        })
    }

    onFocus(movie) {
        if (this.state.focusedMovie === movie) return
        this.setState({focusedMovie: movie})
    }

    onSelect() {
        this.props.history.push(this.state.focusedMovie.getLink(), {movie: this.state.focusedMovie})
    }

    onMount(index, ref) {
        this.moviesListRefMap.set(index, ref)
    }

    setFocus() {
        orderListMap(this.moviesListRefMap, this.state.focusedListIndex)
    }

    pushStateMovieList(title, movieList) {
        let lists = this.state.lists
        lists.push({title, movieList})
        this.setState({lists})
    }

    getWatchedMovies(movies) {
        let watchedMovies = movies.filter(movie => movie.progress > 0)
        if (watchedMovies.length === 0) return
        this.pushStateMovieList('Watched Movies', watchedMovies)
    }

    getFocusedListRef() {
        return this.moviesListRefMap.get(this.state.focusedListIndex )
    }

    renderLists() {
        return this.state.lists.map((list, index) =>
            <MovieListComponent
                key={index}
                index={index}
                hasFocus={this.state.focusedListIndex === index}
                title={list.title} 
                movies={list.movieList} 
                onMount={this.onMount}
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
                <div ref={this.listsRef} className={css.movies__list}>
                    {this.renderLists()}
                </div>
            </div>
        )
    }
}