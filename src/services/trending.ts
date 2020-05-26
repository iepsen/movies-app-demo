import { API_ENDPOINT, API_KEY } from './constants'
import {
  TrendingResponse, TrendingMoviesResponse, TrendingShowsResponse
} from './interfaces/TrendingResponse'
import { MovieModel } from '../models/interfaces/MovieModel'
import { Movie } from '../models/Movie'
import { ShowModel } from '../models/interfaces/ShowModel'
import { Show } from '../models/Show'

const request = async (path: string): Promise<TrendingResponse> => {
  const url = `${API_ENDPOINT}${path}?api_key=${API_KEY}`
  return fetch(url).then((response: Response) => response.json())
}

const getTrendingMovies = async (): Promise<MovieModel[]> => {
  const movies = await request('/trending/movie/day') as TrendingMoviesResponse
  return movies.results.map(movie => Movie(movie))
}

const getTrendingShows = async (): Promise<ShowModel[]> => {
  const shows = await request('/trending/tv/day') as TrendingShowsResponse
  return shows.results.map(show => Show(show))
}

export { getTrendingMovies, getTrendingShows }
