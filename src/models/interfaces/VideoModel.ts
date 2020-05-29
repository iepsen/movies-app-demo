export interface VideoModel {
  id: string
  name: string
  size: 360 | 480 | 720 | 1080
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes' | 'Bloopers'
}
