/** @module presentation/routes */
import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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
const HomeRouteComponent = () => {
    const history = useHistory()
    const [lists, setLists] = useState([])
    const [currentListIndex, setCurrentListIndex] = useState(0)
    const [currentMovie, setCurrentMovie] = useState(null)
    const listsRef = useRef()
    const moviesListRefMap = new Map()
    const interactor = new MoviesInteractor()

    /**
     * Set the MovieListComponent on the Map References
     * when mounted
     * @param {number} index - The MovieListComponent index
     * @param {React.Ref} ref - The MovieListComponent Reference
     */
    const onMountMovieList = (index, ref) => {
        moviesListRefMap.set(index, ref)
    }

    /**
     * Called when a movie is selected
     */
    const onSelect = () => {
        history.push(currentMovie.getLink(), {movie: currentMovie})
    }

    /**
     * Called when a movie has focus
     * @param {MovieEntity} movie - The focused movie
     */
    const onFocus = movie => {
        if (currentMovie === movie) return
        setCurrentMovie(movie)
    }


    /**
     * Set focus on a reordered MovieListComponent
     */
    const setFocus = () => {
        orderListMap(moviesListRefMap, currentListIndex)
    }

    /**
     * Navigate up over lists
     */
    const onKeyUp = () => {
        const nextIndex = currentListIndex - 1
        setCurrentListIndex(moviesListRefMap.has(nextIndex) ? nextIndex : moviesListRefMap.size - 1)
        animateList(listsRef.current, -1, css.slide__up, setFocus)
    }

    /**
     * Navigate down over lists
     */
    const onKeyDown = () => {
        const nextIndex = currentListIndex + 1
        setCurrentListIndex(moviesListRefMap.has(nextIndex) ? nextIndex : 0)
        animateList(listsRef.current, 1, css.slide__down, setFocus)
    }

    /**
     * Push the MovieListComponent to the state
     * @param {string} title - The MovieListComponent title.
     * @param {Array} movieList - The MovieListComponent items.
     */
    const pushStateMovieList = (title, movieList) => {
        setLists(prevLists => [...prevLists, {title, movieList}])
    }

    /**
     * The MovieEntity array to search for watched movies
     * @param {Array} movies - MovieEntity array.
     */
    const getWatchedMovies = (movies) => {
        let watchedMovies = movies.filter(movie => movie.progress > 0)
        if (watchedMovies.length === 0) return
        pushStateMovieList('Watched Movies', watchedMovies)
    }

    /**
     * Render the MovieListComponent array
     */
    const renderLists = () => {
        return lists.map((list, index) =>
            <MovieListComponent
                key={index}
                index={index}
                hasFocus={currentListIndex === index}
                title={list.title} 
                movies={list.movieList} 
                onMount={onMountMovieList}
                onSelect={onSelect} 
                onFocus={onFocus} 
            />
        )
    }

    useEffect(() => {
        interactor.get()
            .then(featuredMovies => {
                pushStateMovieList('Featured Movies', featuredMovies)
                getWatchedMovies(featuredMovies)
            })
        deviceManager.subscribe(deviceManager.KEY_UP, onKeyUp)
        deviceManager.subscribe(deviceManager.KEY_DOWN, onKeyDown)
        return () => {
            deviceManager.unsubscribe(deviceManager.KEY_UP)
            deviceManager.unsubscribe(deviceManager.KEY_DOWN)
        }
    }, [])

    if (lists.length === 0) {
        return <LoadingComponent />
    }

    return (
        <div className={css.container}>
            <div className={css.selected__movie}>
                <SelectedMovieComponent movie={currentMovie} />
            </div>
            <div ref={listsRef} className={css.movies__list}>
                {renderLists()}
            </div>
        </div>
    )
}

export { HomeRouteComponent }