import React from 'react'
import { MovieItemComponent } from './movie-item'
import { deviceManager } from '../../manager/device-manager'
import css from '../styles/movie-list.scss'

export class MovieListComponent extends React.Component {
    constructor(props) {
        super(props)

        this.onKeyOk = this.onKeyOk.bind(this)
        this.onKeyLeft = this.onKeyLeft.bind(this)
        this.onKeyRight = this.onKeyRight.bind(this)

        this.onMount = this.onMount.bind(this)

        this.wrapperRef = React.createRef()
        this.movieListRefMap = new Map()
        this.focusedMovieIndex = 0

        this.state = {
            focusedMovieIndex: this.focusedMovieIndex
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

    onKeyOk() {
        this.onSelect()
    }

    onKeyLeft() {
        this.navigateLeft()
    }

    onKeyRight() {
        this.navigateRight()
    }

    navigateLeft() {
        const index = this.focusedMovieIndex - 1
        this.focusedMovieIndex = (this.movieListRefMap.has(index)) ? index : this.movieListRefMap.size - 1
        this.setFocus()
    }

    navigateRight() {
        const index = this.focusedMovieIndex + 1
        this.focusedMovieIndex = (this.movieListRefMap.has(index)) ? index : 0
        this.setFocus()
    }

    onFocus() {
        if (this.props.onFocus) {
            this.props.onFocus(this.props.movies[this.focusedMovieIndex])
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
        let order
        for (const [key, value] of this.movieListRefMap.entries()) {
            order = key + (this.movieListRefMap.size - this.focusedMovieIndex)
            if (this.focusedMovieIndex > key) {
                order += 1
            } else {
                order = (order - this.movieListRefMap.size) + 1
            }
            value.current.style = `order: ${order}`
        }

        this.setState({
            focusedMovieIndex: this.focusedMovieIndex
        })
        this.onFocus()
    }

    getRefItem(index) {
        return this.movieListRefMap.get(index)
    }

    renderMovies() {
        return this.props.movies.map((movie, index) => 
            <MovieItemComponent 
                onMount={this.onMount} 
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
                <ul className={css.movies}>
                    {this.renderMovies()}
                </ul>
            </div>
        )
    }
}