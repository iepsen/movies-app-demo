import { API_ENDPOINT, API_KEY } from './constants'
import { ShowResponse } from './interfaces/ShowResponse'
import { Show } from '../models/Show'
import { ShowModel } from '../models/interfaces/ShowModel'

const request = async (path: string): Promise<ShowResponse> => {
  const url = `${API_ENDPOINT}${path}?api_key=${API_KEY}`
  return fetch(url).then((response: Response) => response.json())
}

const getShow = async (id: number): Promise<ShowModel> => {
  const show = await request(`/tv/${id}`) as ShowResponse
  return Show(show)
}

export { getShow }
