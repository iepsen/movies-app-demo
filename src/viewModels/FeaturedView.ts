import { IMediaModel } from '../models/interfaces'
import { FeaturedItemViewModel } from './interfaces/FeaturedViewModel'

const FeaturedView = (media: IMediaModel): FeaturedItemViewModel => {
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
