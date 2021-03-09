import { IMediaModel } from './interfaces'
import { IPopularMovieServiceResponse, IPopularShowServiceResponse } from '../services/interfaces'

export const MediaModel = (
  media: IPopularMovieServiceResponse | IPopularShowServiceResponse,
  type: 'movie' | 'show'
): IMediaModel => {
  const getTitle = () => {
    if (type === 'movie') {
      const movieMedia = media as IPopularMovieServiceResponse
      return movieMedia.title
    } else {
      const showMedia = media as IPopularShowServiceResponse
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
