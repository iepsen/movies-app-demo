/** @module presentation/components */
import React from 'react'
import { MovieItemComponent } from './movie-item'
import { deviceManager } from '../../manager/device-manager'
import orderListMap from '../../helpers/order-list-map'
import animateList from '../../helpers/animate-list'
import css from '../styles/movie-list.scss'

export class MovieListComponent extends React.Component {
    /**
     * Initialize the MovieListComponent 
     * @param {React.Props} props - The component props
     */
    constructor(props) {
        super(props)

        this.onKeyOk = this.onKeyOk.bind(this)
        this.onKeyLeft = this.onKeyLeft.bind(this)
        this.onKeyRight = this.onKeyRight.bind(this)
        this.onClickArrowLeft = this.onClickArrowLeft.bind(this)
        this.onClickArrowRight = this.onClickArrowRight.bind(this)
        this.onMouseEnterMovieItem = this.onMouseEnterMovieItem.bind(this)
        this.onMouseEnterArrows = this.onMouseEnterArrows.bind(this)
        this.onMouseLeaveArrows = this.onMouseLeaveArrows.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMovieItemMount = this.onMovieItemMount.bind(this)
        this.setMovieItemFocus = this.setMovieItemFocus.bind(this)

        this.wrapperRef = React.createRef()
        this.listRef = React.createRef()
        this.arrowLeftRef = React.createRef()
        this.arrowRightRef = React.createRef()

        this.movieListRefMap = new Map()
        this.hideArrowsTimer = null
        this.isPointerOverArrows = false
        this.state = {
            focusedMovieIndex: 0
        }
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.onMouseMove)
        this.props.hasFocus ? this.addFocus() : this.removeFocus()
        if (this.props.onMount) {
            this.props.onMount(this.props.index, this.wrapperRef)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.wrapperRef.current === null) return
        if (this.props.movies === null) return
        if (this.props.hasFocus === prevProps.hasFocus) return
        this.props.hasFocus ? this.addFocus() : this.removeFocus()
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.onMouseMove)
        clearTimeout(this.hideArrowsTimer)
        this.removeFocus()
    }

    /**
     * Dispatch on user press ok key
     */
    onKeyOk() {
        this.onSelect()
    }

    /**
     * Dispatch on user press left key
     */
    onKeyLeft() {
        this.navigateLeft()
    }

    /**
     * Dispatch on user press right key
     */
    onKeyRight() {
        this.navigateRight()
    }

    /**
     * Dispatch on user click on the left arrow
     */
    onClickArrowLeft() {
        this.navigateLeft()
    }

    /**
     * Dispatch on user click on the right arrow
     */
    onClickArrowRight() {
        this.navigateRight()
    }

    /**
     * Dispatch on user moves the mouse over the
     * MovieItemComponent
     * @param {number} index 
     */
    onMouseEnterMovieItem(index) {
        this.setMovieIndex(index)
        this.onFocus()
    }

    /**
     * Dispatch on user moves the mouse
     */
    onMouseMove() {
        this.showArrows()
    }

    /**
     * Dispatch on user enter the mouse over
     * the arrows
     */
    onMouseEnterArrows() {
        this.isPointerOverArrows = true
    }

    /**
     * Dispatch on user leave the mouse over
     * the arrows
     */    
    onMouseLeaveArrows() {
        this.isPointerOverArrows = false
    }

    /**
     * Set the timer to hide arrows
     */
    setHideArrowsTimer() {
        clearTimeout(this.hideArrowsTimer)
        this.hideArrowsTimer = setTimeout(() => this.hideArrows(), 3000)
    }

    /**
     * Show mouse arrows
     */
    showArrows() {
        this.arrowLeftRef.current.classList.remove(css.arrow__left_hide)
        this.arrowRightRef.current.classList.remove(css.arrow__right_hide)
        this.isPointerOverArrows ? 
            clearTimeout(this.hideArrowsTimer) : this.setHideArrowsTimer()
    }

    /**
     * Hide mouse arrows
     */
    hideArrows() {
        this.arrowLeftRef.current.classList.add(css.arrow__left_hide)
        this.arrowRightRef.current.classList.add(css.arrow__right_hide)
    }

    /**
     * Discover the previous MovieItemComponent and navigate to it
     */
    navigateLeft() {
        const nextIndex = this.getMovieIndex() - 1
        this.setMovieIndex((this.movieListRefMap.has(nextIndex)) ? nextIndex : this.movieListRefMap.size - 1)
        animateList(this.listRef.current, -1, css.slide__right, this.setMovieItemFocus)
    }

    /**
     * Discover the next MovieItemComponent and navigate to it
     */
    navigateRight() {
        const nextIndex = this.getMovieIndex() + 1
        this.setMovieIndex(this.movieListRefMap.has(nextIndex) ? nextIndex : 0)
        animateList(this.listRef.current, 1, css.slide__left, this.setMovieItemFocus)
    }

    /**
     * Dispatch onSelect when user navigate over the
     * MovieItemComponent component
     */
    onFocus() {
        if (this.props.onFocus) {
            setTimeout(() => 
                this.props.onFocus(this.props.movies[this.getMovieIndex()]), 200)
        }
    }

    /**
     * Dispatch onSelect when user trigger the OK key
     */
    onSelect() {
        if (this.props.onSelect) {
            this.props.onSelect()
        }
    }

    /**
     * Set the MovieItemComponent on the Map References
     * when mounted
     * @param {number} index - The MovieItemComponent index
     * @param {React.Ref} ref - The MovieItemComponent Reference
     */
    onMovieItemMount(index, ref) {
        this.movieListRefMap.set(index, ref)
    }

    /**
     * Set focus on the current MovieListComponent
     */
    addFocus() {
        this.wrapperRef.current.classList.add(css.wrapper__focused)
        setTimeout(() => this.subscribe(), 0)
        this.onFocus()
    }

    /**
     * Remove the focused style class
     */
    removeFocus() {
        this.wrapperRef.current.classList.remove(css.wrapper__focused)
        this.unsubscribe()
    }

    /**
     * Set focus on the current MovieItemComponent
     */
    setMovieItemFocus() {
        orderListMap(this.movieListRefMap, this.getMovieIndex())
        this.onFocus()
    }

    /**
     * Get the focusedMovieIndex state var
     * @returns {number} The focusedMovieIndex state var
     */
    getMovieIndex() {
        return this.state.focusedMovieIndex
    }

    /**
     * Set the focusedMovieIndex state var
     * @param {number} focusedMovieIndex - The index of focused
     * Movie.
     */
    setMovieIndex(focusedMovieIndex) {
        this.setState({focusedMovieIndex})
    }

    /**
     * Subscribe the keys to navigate on the MovieListComponent
     */
    subscribe() {
        deviceManager.subscribe(deviceManager.KEY_OK, this.onKeyOk)
        deviceManager.subscribe(deviceManager.KEY_LEFT, this.onKeyLeft)
        deviceManager.subscribe(deviceManager.KEY_RIGHT, this.onKeyRight)
    }

    /**
     * Unsubscribe the keys on the MovieListComponent
     */
    unsubscribe() {
        deviceManager.unsubscribe(deviceManager.KEY_OK)
        deviceManager.unsubscribe(deviceManager.KEY_LEFT)
        deviceManager.unsubscribe(deviceManager.KEY_RIGHT)
    }


    renderMovies() {
        return this.props.movies.map((movie, index) => 
            <MovieItemComponent 
                onMount={this.onMovieItemMount} 
                onMouseEnter={this.onMouseEnterMovieItem}
                key={index} 
                index={index}
                movie={movie}
                hasFocus={this.props.hasFocus && this.state.focusedMovieIndex === index}
            />
        )
    }

    render() {
        if (this.props.movies === null) return null

        return (
            <div onKeyDown={this.onKeyDown} ref={this.wrapperRef} className={css.wrapper}>
                <h2>{this.props.title}</h2>
                <ul ref={this.listRef} className={css.movies}>
                    {this.renderMovies()}
                </ul>
                <div onClick={this.onClickArrowLeft} onMouseEnter={this.onMouseEnterArrows} onMouseLeave={this.onMouseLeaveArrows} ref={this.arrowLeftRef} className={`${css.arrow} ${css.arrow__left} ${css.arrow__left_hide}`}>
                    <i className={css.material__icons}>chevron_left</i>
                </div>
                <div onClick={this.onClickArrowRight} onMouseEnter={this.onMouseEnterArrows} onMouseLeave={this.onMouseLeaveArrows} ref={this.arrowRightRef} className={`${css.arrow} ${css.arrow__right} ${css.arrow__right_hide}`}>
                    <i className={css.material__icons}>chevron_right</i>
                </div>
            </div>
        )
    }
}