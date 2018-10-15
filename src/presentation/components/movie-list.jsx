import React from 'react'
import { MovieItemComponent } from './movie-item'
import { deviceManager } from '../../manager/device-manager'
import orderListMap from '../../helpers/order-list-map'
import css from '../styles/movie-list.scss'

export class MovieListComponent extends React.Component {
    constructor(props) {
        super(props)

        this.onKeyOk = this.onKeyOk.bind(this)
        this.onKeyLeft = this.onKeyLeft.bind(this)
        this.onKeyRight = this.onKeyRight.bind(this)
        this.onMouseEnter = this.onMouseEnter.bind(this)

        this.onMount = this.onMount.bind(this)

        this.wrapperRef = React.createRef()
        this.listRef = React.createRef()

        this.movieListRefMap = new Map()
        this.state = {
            focusedMovieIndex: 0
        }
    }

    componentDidMount() {
        this.props.hasFocus ? this.hasFocus() : this.lostFocus()
        if (this.props.onMount) {
            this.props.onMount(this.props.index, this.wrapperRef)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.wrapperRef.current === null) return
        if (this.props.movies === null) return
        if (this.props.hasFocus === prevProps.hasFocus) return
        this.props.hasFocus ? this.hasFocus() : this.lostFocus()
    }

    componentWillUnmount() {
        this.lostFocus()
    }

    onKeyOk() {
        this.onSelect()
    }

    onKeyLeft() {
        this.navigateLeft()
    }

    onKeyRight() {
        this.navigateRight()
    }

    onMouseEnter(index) {
        this.setState({
            focusedMovieIndex: index
        })
        this.onFocus()
    }

    navigateLeft() {
        const index = this.state.focusedMovieIndex - 1
        this.setState({
            focusedMovieIndex: (this.movieListRefMap.has(index)) ? index : this.movieListRefMap.size - 1
        })
        this.listRef.current.classList.add(css.slide__right)
        this.listRef.current.addEventListener('animationend', () => {
            this.listRef.current.classList.remove(css.slide__right)
            this.setFocus()
        })
    }

    navigateRight() {
        const index = this.state.focusedMovieIndex  + 1
        this.setState({
            focusedMovieIndex: (this.movieListRefMap.has(index)) ? index : 0
        })
        this.listRef.current.classList.add(css.slide__left)
        this.listRef.current.addEventListener('animationend', () => {
            this.listRef.current.classList.remove(css.slide__left)
            this.setFocus()
        })
    }

    onFocus() {
        if (this.props.onFocus) {
            this.props.onFocus(this.props.movies[this.state.focusedMovieIndex])
        }
    }

    onSelect() {
        if (this.props.onSelect) {
            this.props.onSelect()
        }
    }

    onMount(index, ref) {
        this.movieListRefMap.set(index, ref)
    }

    hasFocus() {
        this.wrapperRef.current.classList.add(css.wrapper__focused)
        setTimeout(() => this.subscribe(), 0)
        this.onFocus()
    }

    lostFocus() {
        this.wrapperRef.current.classList.remove(css.wrapper__focused)
        this.unsubscribe()
    }

    setFocus() {
        orderListMap(this.movieListRefMap, this.state.focusedMovieIndex)
    }

    subscribe() {
        deviceManager.subscribe(deviceManager.KEY_OK, this.onKeyOk)
        deviceManager.subscribe(deviceManager.KEY_LEFT, this.onKeyLeft)
        deviceManager.subscribe(deviceManager.KEY_RIGHT, this.onKeyRight)
    }

    unsubscribe() {
        deviceManager.unsubscribe(deviceManager.KEY_OK)
        deviceManager.unsubscribe(deviceManager.KEY_LEFT)
        deviceManager.unsubscribe(deviceManager.KEY_RIGHT)
    }


    renderMovies() {
        return this.props.movies.map((movie, index) => 
            <MovieItemComponent 
                onMount={this.onMount} 
                onMouseEnter={this.onMouseEnter}
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
            </div>
        )
    }
}