import { API_ENDPOINT, API_KEY } from './constants'
import {
  TrendingMoviesResponse, TrendingShowsResponse
} from './interfaces/TrendingResponse'

const request = (path: string): Promise<any> => {
  const url = `${API_ENDPOINT}${path}?api_key=${API_KEY}`
  return fetch(url).then((response: Response) => response.json())
}

const getTrendingMovies = (): Promise<TrendingMoviesResponse> => request('/trending/movie/day')

const getTrendingShows = (): Promise<TrendingShowsResponse> => request('/trending/tv/day')

export { getTrendingMovies, getTrendingShows }
