import { MediaModel } from './interfaces/MediaModel'
import { TrendingMovieResponse } from '../services/interfaces/TrendingMovieResponse'
import { TrendingShowResponse } from '../services/interfaces/TrendingShowResponse'

const Media = (media: TrendingMovieResponse|TrendingShowResponse): MediaModel => {
  const getType = () => {
    return media.media_type === 'tv' ? 'show' : media.media_type
  }

  const getTitle = () => {
    if (getType() === 'movie') {
      const movieMedia = media as TrendingMovieResponse
      return movieMedia.title
    } else {
      const showMedia = media as TrendingShowResponse
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
    type: getType()
  }
}

export { Media }
