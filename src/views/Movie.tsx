import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getMovie, getVideos } from '../services/movie'
import { MovieModel } from '../models/interfaces/MovieModel'
import { Background } from '../components/Background'
import { BackButton } from '../components/BackButton'
import { Cover } from '../components/Cover'
import { Metadata } from '../components/Metadata'
import { VideoModel } from '../models/interfaces/VideoModel'
import './Movie.css'

const Movie = (): JSX.Element|null => {
  const { id } = useParams()
  const history = useHistory()
  const [movie, setMovie] = useState<MovieModel|null>()
  const [videos, setVideos] = useState<VideoModel[]|undefined>()

  const onBack = (): void => history.goBack()

  useEffect(() => {
    getMovie(id).then(movie => setMovie(movie))
    getVideos(id).then(videos => setVideos(videos))
  }, [])

  if (!movie) return null

  return (
    <>
      <Background image={movie.backgroundImage} />
      <BackButton onBack={onBack} onDown="play-button" />
      <div className="movie-view">
        <Cover image={movie.posterImage} />
        <Metadata data={movie} videos={videos} />
      </div>
    </>
  )
}

export default Movie
