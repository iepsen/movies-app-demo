import { ShowModel } from './interfaces/ShowModel'
import { ShowResponse } from '../services/interfaces/ShowResponse'

const Show = (show: ShowResponse): ShowModel => {
  const getBackgroundImage = (): string => {
    return `https://image.tmdb.org/t/p/w1280${show.backdrop_path}`
  }

  const getPosterImage = (): string => {
    return `https://image.tmdb.org/t/p/w342${show.poster_path}`
  }

  return {
    id: show.id,
    name: show.name,
    overview: show.overview,
    publishDate: new Date(show.first_air_date),
    backgroundImage: getBackgroundImage(),
    posterImage: getPosterImage(),
    popularity: show.popularity,
    mediaType: 'show'
  }
}

export { Show }
