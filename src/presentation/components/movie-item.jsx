/** @module presentation/components */
import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MovieItemViewModel } from '../viewmodel/movie-item'
import css from '../styles/movie-item.scss'

/**
 * MovieItemComponent
 */
const  MovieItemComponent = ({ movie, onMount, onMouseEnter, index, hasFocus }) => {
    const ref = useRef()
    const viewModel = new MovieItemViewModel(movie).get()


    /**
     * Trigger the onMouseEnter event passed via props
     */
    const triggerOnMouseEnter = () => {
        if (onMouseEnter) {
            onMouseEnter(index)
        }
    }

    /**
     * Set focused style class
     */
    const setFocus = () => {
        ref.current.classList.add(css.focused)
    }

    /**
     * Remove focused style class
     */
    const removeFocus = () => {
        ref.current.classList.remove(css.focused)
    }

    useEffect(() => {
        if (onMount) {
            onMount(index)
        }
        return () => removeFocus()
    }, [])

    useEffect(() => {
        hasFocus ? setFocus() : removeFocus()
    }, [hasFocus])

    return (
        <li onMouseEnter={triggerOnMouseEnter} ref={ref} className={css.movie}>
            <Link to={viewModel.movieLink}>
                <img src={viewModel.imageUrl} alt={viewModel.title} />
            </Link>
        </li>
    )
}

export { MovieItemComponent }