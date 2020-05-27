import { MediaModel } from '../models/interfaces/MediaModel'
import { FeaturedItemViewModel } from './interfaces/FeaturedViewModel'

const FeaturedView = (media: MediaModel): FeaturedItemViewModel => {
  const getLink = (): string => {
    return media.type === 'movie' ? `/movie/${media.id}` : `/show/${media.id}`
  }

  return {
    link: getLink(),
    title: media.title,
    overview: media.overview,
    posterImage: media.posterImage,
    backgroundImage: media.backgroundImage
  }
}

export { FeaturedView }
