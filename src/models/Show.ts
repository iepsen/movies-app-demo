import { ShowResponse } from '../services/interfaces/ShowResponse'
import { ShowModel } from './interfaces/ShowModel'

const Show = (show: ShowResponse): ShowModel => {
  const getTitle = (): string => {
    if (show.name === show.original_name) {
      return show.name
    } else {
      return `${show.name} (${show.original_name})`
    }
  }

  const getBackgroundImage = (): string => {
    return `https://image.tmdb.org/t/p/w1280${show.backdrop_path}`
  }

  const getPosterImage = (): string => {
    return `https://image.tmdb.org/t/p/w342${show.poster_path}`
  }

  const getGenres = (): string => {
    return show.genres.map(genre => genre.name).join(', ')
  }

  return {
    id: show.id,
    title: getTitle(),
    originalTitle: show.original_name,
    overview: show.overview,
    releaseDate: new Date(show.first_air_date),
    posterImage: getPosterImage(),
    backgroundImage: getBackgroundImage(),
    popularity: show.popularity,
    genres: getGenres()
  }
}

export { Show }
