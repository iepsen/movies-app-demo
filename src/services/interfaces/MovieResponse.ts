interface Genre {
  id: number
  name: string
}

export interface MovieResponse {
  'id': number
  'title': string
  'original_title': string
  'original_language': string
  'tagline': string
  'overview': string
  'release_date': string
  'genres': Genre[]
  'backdrop_path': string
  'adult': boolean
  'poster_path': string
  'popularity': number
  'media_type': string
}
