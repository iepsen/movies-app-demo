import { MediaModel } from '../models/interfaces/MediaModel'
import { ListItemViewModel } from './interfaces/ListItemViewModel'

const ListItemView = (media: MediaModel): ListItemViewModel => {
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

export { ListItemView }