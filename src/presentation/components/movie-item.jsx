import React from 'react'
import { Link } from 'react-router-dom'
import css from '../styles/movie-item.scss'

export class MovieItemComponent extends React.Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
        this.link = {
            pathname: `/movie/${this.props.movie.id}`,
            state: { movie: this.props.movie }
        }
    }

    componentDidMount() {
        if (this.props.onMount) {
            this.props.onMount(this.props.index, this.ref)
        }
    }

    render() {
        return (
            <li ref={this.ref} className={css.movie}>
                <Link to={this.link}>
                    <img src={this.props.movie.image.url} alt={this.props.movie.title} />
                </Link>
            </li>
        )
    }
}