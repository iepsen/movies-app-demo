import { useState, useEffect, ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovie, getMovieVideos } from '../services'
import { IMovieModel, IVideoModel } from '../models/interfaces'
import { Background } from '../components/Background'
import { BackButton } from '../components/BackButton'
import { Focus } from '../components/Focus'
import { Cover } from '../components/Cover'
import { Metadata } from '../components/Metadata'
import './Movie.css'

const Movie = (): ReactElement => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<IMovieModel | undefined>()
  const [videos, setVideos] = useState<IVideoModel[]>([])

  const onBack = () => navigate(-1)

  useEffect(() => {
    getMovie(id ?? '').then(movie => setMovie(movie))
    getMovieVideos(id ?? '').then(videos => setVideos(videos))
  }, [id])

  return (
    <>
      <Background image={movie?.backgroundImage} />
      <Focus
        id="back-button"
        onSelect={onBack}
        bottomId={videos.length > 0 ? 'play-button' : undefined}
        rightId={videos.length > 0 ? 'play-button' : undefined}
        autoFocus
      >
        <BackButton onClick={onBack} />
      </Focus>
      <div className="movie-view">
        <Cover image={movie?.posterImage} />
        <Metadata data={movie} videos={videos} />
      </div>
    </>
  )
}

export { Movie }
