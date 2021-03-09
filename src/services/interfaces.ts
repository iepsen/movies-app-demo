/* eslint-disable camelcase */
interface Genre {
  id: number
  name: string
}

export interface IMovieServiceResponse {
  id: number
  title: string
  original_title: string
  original_language: string
  tagline: string
  overview: string
  release_date: string
  genres: Genre[]
  backdrop_path: string
  adult: boolean
  poster_path: string
  popularity: number
  media_type: string
}

export interface IPopularMovieServiceResponse {
  id: number
  video: boolean
  vote_count: number
  vote_average: number
  title: string
  release_date: string
  original_language: string
  original_title: string
  genre_ids: Genre['id'][]
  backdrop_path: string
  adult: boolean
  overview: string
  poster_path: string
  popularity: number
}

export interface IPopularShowServiceResponse {
  id: number
  vote_count: number
  vote_average: number
  name: string
  first_air_date: string
  original_language: string
  original_name: string
  genre_ids: Genre['id'][]
  backdrop_path: string
  overview: string
  poster_path: string
  popularity: number
}

export interface IPopularServiceResponse {
  page: number
  total_pages: number
  total_results: number
  results: IPopularMovieServiceResponse[] | IPopularShowServiceResponse[]
}

export interface IPopularMovieListServiceResponse extends IPopularServiceResponse {
  results: IPopularMovieServiceResponse[]
}

export interface IPopularShowListServiceResponse extends IPopularServiceResponse {
  results: IPopularShowServiceResponse[]
}

export interface IShowServiceResponse {
  original_name: string
  id: number
  name: string
  vote_count: number
  vote_average: number
  first_air_date: string
  poster_path: string
  genres: Genre[]
  original_language: string
  backdrop_path: string
  overview: string
  origin_country: string[]
  popularity: number
  media_type: string
}

export interface IVideoServiceResponse {
  id: string
  key: string
  name: string
  site: string
  size: 360 | 480 | 720 | 1080
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes' | 'Bloopers'
}

export interface IVideoListServiceResponse {
  results: IVideoServiceResponse[]
}
