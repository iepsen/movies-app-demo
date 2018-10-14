import React from 'react'
import { MovieItemComponent } from './movie-item'
import css from '../styles/movie-list.scss'

export class MovieListComponent extends React.Component {
    constructor(props) {
        super(props)
        this.listRef = React.createRef()
        this.wrapperRef = React.createRef()
        this.moviesRefMap = new Map()
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onMount = this.onMount.bind(this)
        this.currentItemIndex = 0
        this.state = {
            movieFocusIndex: 0
        }
    }

    componentDidMount() {
        if (this.props.onMount) {
            this.props.onMount(this.props.index, this.wrapperRef)
        }
        this.props.hasFocus ? this.hasFocus() : this.lostFocus()
    }

    componentDidUpdate() {
        if (this.wrapperRef.current === null) return
        if (this.props.movies === null) return
        this.props.hasFocus ? this.hasFocus() : this.lostFocus()
    }

    componentWillUnmount() {
        this.lostFocus()
    }

    onKeyDown(event) {
        switch(event.keyCode) {
        case 13:
            this.onChoose()
            break
        case 37:
            this.onNavigateLeft()
            this.update()
            break
        case 39:
            this.onNavigateRight()
            this.update()
            break
        default: break
        }
    }

    onNavigateLeft() {
        const index = this.currentItemIndex - 1
        this.currentItemIndex = (this.moviesRefMap.has(index)) ? index : this.moviesRefMap.size - 1
    }

    onNavigateRight() {
        const index = this.currentItemIndex + 1
        this.currentItemIndex = (this.moviesRefMap.has(index)) ? index : 0
    }

    onSelect() {
        if (this.props.onSelect) {
            this.props.onSelect(this.props.movies[this.currentItemIndex])
        }
    }

    onChoose() {
        if (this.props.onChoose) {
            this.props.onChoose()
        }
    }

    onMount(index, ref) {
        this.moviesRefMap.set(index, ref)
    }

    hasFocus() {
        window.addEventListener('keydown', this.onKeyDown)
        this.wrapperRef.current.classList.add(css.wrapper__focused)
        this.onSelect()
    }

    lostFocus() {
        window.removeEventListener('keydown', this.onKeyDown)
        this.wrapperRef.current.classList.remove(css.wrapper__focused)
    }

    update() {
        let order
        for (const [key, value] of this.moviesRefMap.entries()) {
            order = key + (this.moviesRefMap.size - this.currentItemIndex)
            if (this.currentItemIndex > key) {
                order += 1
            } else {
                order = (order - this.moviesRefMap.size) + 1
            }
            value.current.style = `order: ${order}`
        }
        this.onSelect()
        this.setState({
            movieFocusIndex: this.currentItemIndex
        })

    }

    getRefItem(index) {
        return this.moviesRefMap.get(index)
    }

    renderMovies() {
        return this.props.movies.map((movie, index) => 
            <MovieItemComponent 
                onMount={this.onMount} 
                key={index} 
                index={index}
                movie={movie}
                hasFocus={this.props.hasFocus && this.state.movieFocusIndex === index}
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