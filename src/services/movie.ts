import { API_ENDPOINT, API_KEY } from './constants'
import { MovieResponse } from './interfaces/MovieResponse'
import { ShowResponse } from './interfaces/ShowResponse'
import { MovieModel } from '../models/interfaces/MovieModel'
import { Movie } from '../models/Movie'

const request = async (path: string): Promise<MovieResponse|ShowResponse> => {
  const url = `${API_ENDPOINT}${path}?api_key=${API_KEY}`
  return fetch(url).then((response: Response) => response.json())
}

const getMovie = async (id: number): Promise<MovieModel> => {
  const movie = await request(`/movie/${id}`) as MovieResponse
  return Movie(movie)
}

export { getMovie }
