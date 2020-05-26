import { MediaModel } from '../models/interfaces/MediaModel'
import { ListItemViewModel } from './interfaces/ListItemViewModel'

const ListItemView = (media: MediaModel): ListItemViewModel => {
  return {
    link: `/details/${media.id}`,
    title: media.title,
    posterImage: media.posterImage
  }
}

export { ListItemView }
