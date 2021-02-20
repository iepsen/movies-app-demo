import { API_ENDPOINT, API_KEY } from './constants'
import { ShowResponse } from './interfaces/ShowResponse'
import { ShowModel } from '../models/interfaces/ShowModel'
import { VideoModel } from '../models/interfaces/VideoModel'
import { getVideosByType } from './video'
import { Show } from '../models/Show'

const request = async (path: string): Promise<ShowResponse> => {
  const url = `${API_ENDPOINT}${path}?api_key=${API_KEY}`
  return fetch(url).then((response: Response) => response.json())
}

const getShow = async (id: string): Promise<ShowModel> => {
  const show = (await request(`/tv/${id}`)) as ShowResponse
  return Show(show)
}

const getVideos = async (id: string): Promise<VideoModel[]> => {
  return getVideosByType(id, 'tv')
}

export { getShow, getVideos }
