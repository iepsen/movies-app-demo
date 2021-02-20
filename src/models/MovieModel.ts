import { IMovieServiceResponse } from '../services/interfaces'
import { IMovieModel } from './interfaces'

export const MovieModel = (movie: IMovieServiceResponse): IMovieModel => {
  const getTitle = (): string => {
    if (movie.title === movie.original_title) {
      return movie.title
    } else {
      return `${movie.title} (${movie.original_title})`
    }
  }

  const getBackgroundImage = (): string => {
    return `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
  }

  const getPosterImage = (): string => {
    return `https://image.tmdb.org/t/p/w342${movie.poster_path}`
  }

  const getGenres = (): string => {
    return movie.genres.map(genre => genre.name).join(', ')
  }

  return {
    id: movie.id,
    title: getTitle(),
    originalTitle: movie.original_title,
    overview: movie.overview,
    releaseDate: new Date(movie.release_date),
    posterImage: getPosterImage(),
    backgroundImage: getBackgroundImage(),
    genres: getGenres(),
    popularity: movie.popularity
  }
}
