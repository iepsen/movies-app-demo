import { VideoResponse } from '../services/interfaces/VideoResponse'
import { VideoModel } from './interfaces/VideoModel'

const Video = (video: VideoResponse): VideoModel => {
  const { key, name, size, type } = video
  return { id: key, name, size, type }
}

export { Video }
