import { MovieResponse } from './MovieResponse'
import { ShowResponse } from './ShowResponse'

interface TrendingResponse {
  'page': number
  'total_pages': number
  'total_results': number
}

export interface TrendingMoviesResponse extends TrendingResponse {
  'results': MovieResponse[]
}

export interface TrendingShowsResponse extends TrendingResponse {
  'results': ShowResponse[]
}
