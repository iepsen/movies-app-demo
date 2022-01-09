import { API_ENDPOINT, API_KEY } from './constants'
import {
  IMovieServiceResponse,
  IVideoListServiceResponse,
  IShowServiceResponse,
  IPopularMovieServiceResponse,
  IPopularShowServiceResponse,
  IPopularShowListServiceResponse,
  IPopularMovieListServiceResponse
} from './interfaces'
import {
  IMovieModel,
  IVideoModel,
  IMediaModel,
  IShowModel
} from '../models/interfaces'
import { MediaModel, MovieModel, ShowModel, VideoModel } from '../models'

type ResponseType =
  | IMovieServiceResponse
  | IPopularMovieServiceResponse
  | IVideoListServiceResponse
  | IShowServiceResponse
  | IPopularShowServiceResponse
  | IPopularShowListServiceResponse
  | IPopularMovieListServiceResponse

const request = async (path: string): Promise<ResponseType> => {
  const url = `${API_ENDPOINT}${path}?api_key=${API_KEY}`
  return fetch(url).then((response: Response) => response.json())
}

export const getMovie = async (id: string): Promise<IMovieModel> => {
  const movie = (await request(`/movie/${id}`)) as IMovieServiceResponse
  return MovieModel(movie)
}

export const getShow = async (id: string): Promise<IShowModel> => {
  const show = (await request(`/tv/${id}`)) as IShowServiceResponse
  return ShowModel(show)
}

export const getVideosByType = async (
  id: string,
  type: 'movie' | 'tv'
): Promise<IVideoModel[]> => {
  const videos = (await request(
    `/${type}/${id}/videos`
  )) as IVideoListServiceResponse
  return videos.results.map(video => VideoModel(video))
}

export const getMovieVideos = async (id: string): Promise<IVideoModel[]> => {
  return getVideosByType(id, 'movie')
}

export const getShowVideos = async (id: string): Promise<IVideoModel[]> => {
  return getVideosByType(id, 'tv')
}

export const getPopularMovies = async (): Promise<IMediaModel[]> => {
  const movies = (await request(
    '/movie/popular'
  )) as IPopularMovieListServiceResponse
  return movies.results.map(movie => MediaModel(movie, 'movie'))
}

export const getDiscoverMovies = async (): Promise<IMediaModel[]> => {
  const movies = (await request(
    '/discover/movie'
  )) as IPopularShowListServiceResponse
  return movies.results.map(show => MediaModel(show, 'movie'))
}

export const getPopularShows = async (): Promise<IMediaModel[]> => {
  const shows = (await request(
    '/tv/popular'
  )) as IPopularShowListServiceResponse
  return shows.results.map(show => MediaModel(show, 'show'))
}

export const getDiscoverShows = async (): Promise<IMediaModel[]> => {
  const shows = (await request(
    '/discover/tv'
  )) as IPopularShowListServiceResponse
  return shows.results.map(show => MediaModel(show, 'show'))
}
