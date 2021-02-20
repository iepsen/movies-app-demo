import { API_ENDPOINT, API_KEY } from './constants'
import { MovieResponse } from './interfaces/MovieResponse'
import { MovieModel } from '../models/interfaces/MovieModel'
import { VideoModel } from '../models/interfaces/VideoModel'
import { getVideosByType } from './video'
import { Movie } from '../models/Movie'

const request = async (path: string): Promise<MovieResponse> => {
  const url = `${API_ENDPOINT}${path}?api_key=${API_KEY}`
  return fetch(url).then((response: Response) => response.json())
}

const getMovie = async (id: string): Promise<MovieModel> => {
  const movie = (await request(`/movie/${id}`)) as MovieResponse
  return Movie(movie)
}

const getVideos = async (id: string): Promise<VideoModel[]> => {
  return getVideosByType(id, 'movie')
}

export { getMovie, getVideos }
