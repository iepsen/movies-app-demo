import { MovieResponse } from './MovieResponse'
import { ShowResponse } from './ShowResponse'

export interface TrendingResponse {
  'page': number
  'total_pages': number
  'total_results': number
  'results': MovieResponse[]|ShowResponse[]
}

export interface TrendingMoviesResponse extends TrendingResponse {
  'results': MovieResponse[]
}

export interface TrendingShowsResponse extends TrendingResponse {
  'results': ShowResponse[]
}
