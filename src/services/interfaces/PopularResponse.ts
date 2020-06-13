import { PopularMovieResponse } from './PopularMovieResponse'
import { PopularShowResponse } from './PopularShowResponse'

export interface PopularResponse {
  'page': number
  'total_pages': number
  'total_results': number
  'results': PopularMovieResponse[]|PopularShowResponse[]
}

export interface PopularMoviesResponse extends PopularResponse {
  'results': PopularMovieResponse[]
}

export interface PopularShowsResponse extends PopularResponse {
  'results': PopularShowResponse[]
}
