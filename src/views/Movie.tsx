import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getMovie } from '../services/movie'
import { MovieModel } from '../models/interfaces/MovieModel'
import { Background } from '../components/Background'
import { Cover } from '../components/Cover'
import { Metadata } from '../components/Metadata'
import './Movie.css'

const Movie = (): JSX.Element|null => {
  const { id } = useParams()
  const [movie, setMovie] = useState<MovieModel|null>(null)
  useEffect(() => {
    getMovie(id).then(movie => setMovie(movie))
  }, [])

  if (!movie) {
    return null
  }

  return (
    <>
      <Background image={movie.backgroundImage} />
      <div className="movie-view">
        <Cover image={movie.posterImage} />
        <Metadata data={movie} />
      </div>
    </>
  )
}

export default Movie