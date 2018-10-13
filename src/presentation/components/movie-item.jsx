import React from 'react'
import { Link } from 'react-router-dom'
import { MovieItemViewModel } from '../viewmodel/movie-item'
import css from '../styles/movie-item.scss'

export class MovieItemComponent extends React.Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
        this.viewModel = new MovieItemViewModel(props.movie).get()
    }

    componentDidMount() {
        if (this.props.onMount) {
            this.props.onMount(this.props.index, this.ref)
        }
    }

    render() {
        return (
            <li ref={this.ref} className={css.movie}>
                <Link to={this.viewModel.movieLink}>
                    <img src={this.viewModel.imageUrl} alt={this.viewModel.title} />
                </Link>
            </li>
        )
    }
}