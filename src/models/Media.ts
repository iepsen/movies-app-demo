import { MediaModel } from './interfaces/MediaModel'
import { PopularMovieResponse } from '../services/interfaces/PopularMovieResponse'
import { PopularShowResponse } from '../services/interfaces/PopularShowResponse'

const Media = (media: PopularMovieResponse|PopularShowResponse, type: 'movie'|'show'): MediaModel => {
  const getTitle = () => {
    if (type === 'movie') {
      const movieMedia = media as PopularMovieResponse
      return movieMedia.title
    } else {
      const showMedia = media as PopularShowResponse
      return showMedia.name
    }
  }

  const getBackgroundImage = (): string => {
    return `https://image.tmdb.org/t/p/w1280${media.backdrop_path}`
  }

  const getPosterImage = (): string => {
    return `https://image.tmdb.org/t/p/w342${media.poster_path}`
  }

  return {
    id: media.id,
    title: getTitle(),
    overview: media.overview,
    backgroundImage: getBackgroundImage(),
    posterImage: getPosterImage(),
    type
  }
}

export { Media }
