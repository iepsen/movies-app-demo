import { API_ENDPOINT, API_KEY } from './constants'
import {
  PopularResponse, PopularMoviesResponse, PopularShowsResponse
} from './interfaces/PopularResponse'
import { MediaModel } from '../models/interfaces/MediaModel'
import { Media } from '../models/Media'

const request = async (path: string): Promise<PopularResponse> => {
  const url = `${API_ENDPOINT}${path}?api_key=${API_KEY}`
  return fetch(url).then((response: Response) => response.json())
}

const getPopularMovies = async (): Promise<MediaModel[]> => {
  const movies = await request('/movie/popular') as PopularMoviesResponse
  return movies.results.map(movie => Media(movie, 'movie'))
}

const getPopularShows = async (): Promise<MediaModel[]> => {
  const shows = await request('/tv/popular') as PopularShowsResponse
  return shows.results.map(show => Media(show, 'show'))
}

export { getPopularMovies, getPopularShows }
