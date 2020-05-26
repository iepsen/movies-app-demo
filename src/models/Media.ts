import { MovieResponse } from '../services/interfaces/MovieResponse'
import { MediaModel } from './interfaces/MediaModel'
import { ShowResponse } from '../services/interfaces/ShowResponse'

const Media = (media: MovieResponse|ShowResponse): MediaModel => {
  const getType = () => {
    return media.media_type === 'tv' ? 'show' : media.media_type
  }

  const getTitle = () => {
    if (getType() === 'movie') {
      const movieMedia = media as MovieResponse
      return movieMedia.title
    } else {
      const showMedia = media as ShowResponse
      return showMedia.name
    }
  }

  const getBackgroundImage = (): string => {
    return `https://image.tmdb.org/t/p/w1280${media.backdrop_path}`
  }

  const getPosterImage = (): string => {
    return `https://image.tmdb.org/t/p/w342${media.poster_path}`
  }

  const getReleaseDate = () => {
    if (getType() === 'movie') {
      const movieMedia = media as MovieResponse
      return new Date(movieMedia.release_date)
    } else {
      const showMedia = media as ShowResponse
      return new Date(showMedia.first_air_date)
    }
  }

  return {
    id: media.id,
    title: getTitle(),
    overview: media.overview,
    releaseDate: getReleaseDate(),
    backgroundImage: getBackgroundImage(),
    posterImage: getPosterImage(),
    popularity: media.popularity,
    type: getType()
  }
}

export { Media }
