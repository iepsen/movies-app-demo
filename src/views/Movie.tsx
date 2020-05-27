import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getMovie } from '../services/movie'
import { MovieModel } from '../models/interfaces/MovieModel'

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
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>{movie.genres}</p>
    </div>
  )
}

export default Movie
