import { API_ENDPOINT, API_KEY } from './constants'
import { VideosResponse } from './interfaces/VideosResponse'
import { VideoModel } from '../models/interfaces/VideoModel'
import { Video } from '../models/Video'

const request = async (path: string): Promise<VideosResponse> => {
  const url = `${API_ENDPOINT}${path}?api_key=${API_KEY}`
  return fetch(url).then((response: Response) => response.json())
}

const getVideosByType = async (id: number, type: 'movie' | 'tv'): Promise<VideoModel[]> => {
  const videos = await request(`/${type}/${id}/videos`) as VideosResponse
  return videos.results.map(video => Video(video))
}

export { getVideosByType }
