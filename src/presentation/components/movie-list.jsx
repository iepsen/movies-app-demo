/** @module presentation/components */
import React, { useRef, useState, useEffect } from 'react'
import { MovieItemComponent } from './movie-item'
import { deviceManager } from '../../manager/device-manager'
import orderListMap from '../../helpers/order-list-map'
import animateList from '../../helpers/animate-list'
import css from '../styles/movie-list.scss'

const movieListRefMap = new Map()

const  MovieListComponent = ({ hasFocus, onFocus, onSelect, onMount, index, title, movies }) => {
    const wrapperRef = useRef()
    const listRef = useRef()
    const arrowLeftRef = useRef()
    const arrowRightRef = useRef()
    let hideArrowsTimer = null
    let isPointerOverArrows = false
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0)

    /**
     * Dispatch on user press ok key
     */
    const onKeyOk = () => {
        dispatchOnSelect()
    }

    /**
     * Dispatch on user press left key
     */
    const onKeyLeft = () => {
        navigateLeft()
    }

    /**
     * Dispatch on user press right key
     */
    const onKeyRight = () => {
        navigateRight()
    }

    /**
     * Dispatch on user click on the left arrow
     */
    const onClickArrowLeft = () => {
        navigateLeft()
    }

    /**
     * Dispatch on user click on the right arrow
     */
    const onClickArrowRight = () => {
        navigateRight()
    }

    /**
     * Dispatch on user moves the mouse over the
     * MovieItemComponent
     * @param {number} index 
     */
    const onMouseEnterMovieItem = index => {
        setMovieIndex(index)
        dispatchOnFocus()
    }

    /**
     * Dispatch on user moves the mouse
     */
    const onMouseMove = () => {
        showArrows()
    }

    /**
     * Dispatch on user enter the mouse over
     * the arrows
     */
    const onMouseEnterArrows = () => {
        isPointerOverArrows = true
    }

    /**
     * Dispatch on user leave the mouse over
     * the arrows
     */    
    const onMouseLeaveArrows = () => {
        isPointerOverArrows = false
    }

    /**
     * Set the timer to hide arrows
     */
    const setHideArrowsTimer = () => {
        clearTimeout(hideArrowsTimer)
        hideArrowsTimer = setTimeout(() => hideArrows(), 3000)
    }

    /**
     * Show mouse arrows
     */
    const showArrows = () => {
        arrowLeftRef.current.classList.remove(css.arrow__left_hide)
        arrowRightRef.current.classList.remove(css.arrow__right_hide)
        isPointerOverArrows ? 
            clearTimeout(hideArrowsTimer) : setHideArrowsTimer()
    }

    /**
     * Hide mouse arrows
     */
    const hideArrows = () => {
        arrowLeftRef.current.classList.add(css.arrow__left_hide)
        arrowRightRef.current.classList.add(css.arrow__right_hide)
    }

    /**
     * Discover the previous MovieItemComponent and navigate to it
     */
    const navigateLeft = () => {
        const nextIndex = getMovieIndex() - 1
        setMovieIndex((movieListRefMap.has(nextIndex)) ? nextIndex : movieListRefMap.size - 1)
        animateList(listRef.current, -1, css.slide__right, setMovieItemFocus)
    }

    /**
     * Discover the next MovieItemComponent and navigate to it
     */
    const navigateRight = () => {
        const nextIndex = currentMovieIndex + 1
        setMovieIndex(movieListRefMap.has(nextIndex) ? nextIndex : 0)
        animateList(listRef.current, 1, css.slide__left, setMovieItemFocus)
    }

    /**
     * Dispatch onFocus when user navigate over the
     * MovieItemComponent component
     */
    const dispatchOnFocus = () => {
        if (onFocus) {
            setTimeout(() => 
                onFocus(movies[getMovieIndex()]), 200)
        }
    }

    /**
     * Dispatch onSelect when user trigger the OK key
     */
    const dispatchOnSelect = () => {
        if (onSelect) {
            onSelect()
        }
    }

    /**
     * Set the MovieItemComponent on the Map References
     * when mounted
     * @param {number} index - The MovieItemComponent index
     * @param {React.Ref} ref - The MovieItemComponent Reference
     */
    const onMovieItemMount = (index, ref) => {
        movieListRefMap.set(index, ref)
    }

    /**
     * Set focused style class
     */
    const setFocus = () => {
        wrapperRef.current.classList.add(css.focused)
        setTimeout(() => subscribe(), 0)
        dispatchOnFocus()
    }

    /**
     * Remove the focused style class
     */
    const removeFocus = () => {
        wrapperRef.current.classList.remove(css.focused)
        unsubscribe()
    }

    /**
     * Set focus on the current MovieItemComponent
     */
    const setMovieItemFocus = () => {
        orderListMap(movieListRefMap, getMovieIndex())
        dispatchOnFocus()
    }

    /**
     * Get the focusedMovieIndex state var
     * @returns {number} The focusedMovieIndex state var
     */
    const getMovieIndex = () => {
        return currentMovieIndex
    }

    /**
     * Set the focusedMovieIndex state var
     * @param {number} movieIndex - The index of focused
     * Movie.
     */
    const setMovieIndex = movieIndex => {
        setCurrentMovieIndex(movieIndex)
    }

    /**
     * Subscribe the keys to navigate on the MovieListComponent
     */
    const subscribe = () => {
        deviceManager.subscribe(deviceManager.KEY_OK, onKeyOk)
        deviceManager.subscribe(deviceManager.KEY_LEFT, onKeyLeft)
        deviceManager.subscribe(deviceManager.KEY_RIGHT, onKeyRight)
    }

    /**
     * Unsubscribe the keys on the MovieListComponent
     */
    const unsubscribe = () => {
        deviceManager.unsubscribe(deviceManager.KEY_OK)
        deviceManager.unsubscribe(deviceManager.KEY_LEFT)
        deviceManager.unsubscribe(deviceManager.KEY_RIGHT)
    }

    const renderMovies = () => {
        return movies.map((movie, index) => 
            <MovieItemComponent 
                onMount={onMovieItemMount} 
                onMouseEnter={onMouseEnterMovieItem}
                key={index} 
                index={index}
                movie={movie}
                hasFocus={hasFocus && currentMovieIndex === index}
            />
        )
    }

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove)
        hasFocus ? setFocus() : removeFocus()
        if (onMount) {
            onMount(index, wrapperRef)
        }
        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            clearTimeout(hideArrowsTimer)
            removeFocus()
        }
    }, [])

    useEffect(() => {
        if (movies === null) return
        hasFocus ? setFocus() : removeFocus()
    }, [hasFocus])
    
    if (wrapperRef.current === null) return
    if (movies === null) return null

    return (
        <div ref={wrapperRef} className={css.wrapper}>
            <h2>{title}</h2>
            <ul ref={listRef} className={css.movies}>
                {renderMovies()}
            </ul>
            <div onClick={onClickArrowLeft} onMouseEnter={onMouseEnterArrows} onMouseLeave={onMouseLeaveArrows} ref={arrowLeftRef} className={`${css.arrow} ${css.arrow__left} ${css.arrow__left_hide}`}>
                <i className={css.material__icons}>chevron_left</i>
            </div>
            <div onClick={onClickArrowRight} onMouseEnter={onMouseEnterArrows} onMouseLeave={onMouseLeaveArrows} ref={arrowRightRef} className={`${css.arrow} ${css.arrow__right} ${css.arrow__right_hide}`}>
                <i className={css.material__icons}>chevron_right</i>
            </div>
        </div>
    )
}

export { MovieListComponent }