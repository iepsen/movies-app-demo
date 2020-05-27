import { TrendingMovieResponse } from './TrendingMovieResponse'
import { TrendingShowResponse } from './TrendingShowResponse'

export interface TrendingResponse {
  'page': number
  'total_pages': number
  'total_results': number
  'results': TrendingMovieResponse[]|TrendingShowResponse[]
}

export interface TrendingMoviesResponse extends TrendingResponse {
  'results': TrendingMovieResponse[]
}

export interface TrendingShowsResponse extends TrendingResponse {
  'results': TrendingShowResponse[]
}
