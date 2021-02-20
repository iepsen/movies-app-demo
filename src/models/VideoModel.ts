import { IVideoServiceResponse } from '../services/interfaces'
import { IVideoModel } from './interfaces'

export const VideoModel = (video: IVideoServiceResponse): IVideoModel => {
  const { key, name, size, type } = video
  return { id: key, name, size, type }
}
