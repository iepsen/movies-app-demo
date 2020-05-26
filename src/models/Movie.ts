import { MovieResponse } from '../services/interfaces/MovieResponse'
import { MovieModel } from './interfaces/MovieModel'

const Movie = (movie: MovieResponse): MovieModel => {
  const getBackgroundImage = (): string => {
    return `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`
  }

  const getPosterImage = (): string => {
    return `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
  }

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    releaseDate: new Date(movie.release_date),
    backgroundImage: getBackgroundImage(),
    posterImage: getPosterImage(),
    popularity: movie.popularity,
    mediaType: movie.media_type
  }
}

export { Movie }
