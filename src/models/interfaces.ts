export interface IMediaModel {
  id: number
  title: string
  posterImage: string
  backgroundImage: string
  overview: string
  type: string
}

export interface IMovieModel {
  id: number
  title: string
  originalTitle: string
  overview: string
  releaseDate: Date
  posterImage: string
  backgroundImage: string
  genres: string
  popularity: number
}

export interface IShowModel {
  id: number
  title: string
  originalTitle: string
  overview: string
  releaseDate: Date
  posterImage: string
  backgroundImage: string
  popularity: number
  genres: string
}

export interface IVideoModel {
  id: string
  name: string
  size: 360 | 480 | 720 | 1080
  type:
    | 'Trailer'
    | 'Teaser'
    | 'Clip'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Bloopers'
}
