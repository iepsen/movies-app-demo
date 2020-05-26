import { API_ENDPOINT, API_KEY } from './constants'
import {
  TrendingResponse, TrendingMoviesResponse, TrendingShowsResponse
} from './interfaces/TrendingResponse'
import { MediaModel } from '../models/interfaces/MediaModel'
import { Media } from '../models/Media'

const request = async (path: string): Promise<TrendingResponse> => {
  const url = `${API_ENDPOINT}${path}?api_key=${API_KEY}`
  return fetch(url).then((response: Response) => response.json())
}

const getTrendingMovies = async (): Promise<MediaModel[]> => {
  const movies = await request('/trending/movie/day') as TrendingMoviesResponse
  return movies.results.map(movie => Media(movie))
}

const getTrendingShows = async (): Promise<MediaModel[]> => {
  const shows = await request('/trending/tv/day') as TrendingShowsResponse
  return shows.results.map(show => Media(show))
}

export { getTrendingMovies, getTrendingShows }
