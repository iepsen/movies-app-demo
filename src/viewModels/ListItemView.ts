import { IMediaModel } from '../models/interfaces'
import { ListItemViewModel } from './interfaces/ListItemViewModel'

const ListItemView = (media: IMediaModel): ListItemViewModel => {
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
