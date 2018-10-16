/** @module presentation/components */
import React from 'react'
import { Link } from 'react-router-dom'
import { MovieItemViewModel } from '../viewmodel/movie-item'
import css from '../styles/movie-item.scss'

/**
 * MovieItemComponent
 */
export class MovieItemComponent extends React.Component {
    /**
     * Initialize the MovieItemComponent
     * @param {React.Props} props - The component props
     */
    constructor(props) {
        super(props)
        this.ref = React.createRef()
        this.viewModel = new MovieItemViewModel(props.movie).get()
        this.onMouseEnter = this.onMouseEnter.bind(this)
    }

    componentDidMount() {
        if (this.props.onMount) {
            this.props.onMount(this.props.index, this.ref)
        }
        this.props.hasFocus ? this.hasFocus() : this.lostFocus()
    }

    componentDidUpdate() {
        this.props.hasFocus ? this.hasFocus() : this.lostFocus()
    }

    componentWillUnmount() {
        this.lostFocus()
    }

    /**
     * Trigger the onMouseEnter event passed via props
     */
    onMouseEnter() {
        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(this.props.index)
        }
    }

    /**
     * Add selected style class
     */
    hasFocus() {
        this.ref.current.classList.add(css.selected__movie)
    }

    /**
     * Remove selected style class
     */
    lostFocus() {
        this.ref.current.classList.remove(css.selected__movie)
    }

    render() {
        return (
            <li onMouseEnter={this.onMouseEnter} ref={this.ref} className={css.movie}>
                <Link to={this.viewModel.movieLink}>
                    <img src={this.viewModel.imageUrl} alt={this.viewModel.title} />
                </Link>
            </li>
        )
    }
}