export interface VideoResponse {
  'id': string
  'iso_639_1': string
  'iso_3166_1': string
  'key': string
  'name': string
  'site': string
  'size': 360 | 480 | 720 | 1080
  'type': 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes' | 'Bloopers'
}
