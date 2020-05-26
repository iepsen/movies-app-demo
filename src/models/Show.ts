import { ShowModel } from './interfaces/ShowModel'
import { ShowResponse } from '../services/interfaces/ShowResponse'

const Show = (show: ShowResponse): ShowModel => {
  return {
    id: show.id,
    name: show.name,
    overview: show.overview,
    publishDate: new Date(show.first_air_date),
    backgroundImage: show.backdrop_path,
    posterImage: show.poster_path,
    popularity: show.popularity,
    mediaType: show.media_type
  }
}

export { Show }
