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
        this.props.hasFocus ? this.setFocus() : this.removeFocus()
    }

    componentDidUpdate() {
        this.props.hasFocus ? this.setFocus() : this.removeFocus()
    }

    componentWillUnmount() {
        this.removeFocus()
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
     * Add focused style class
     */
    setFocus() {
        this.ref.current.classList.add(css.focused)
    }

    /**
     * Remove focused style class
     */
    removeFocus() {
        this.ref.current.classList.remove(css.focused)
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