import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getShow, getVideos } from '../services/show'
import { Background } from '../components/Background'
import { BackButton } from '../components/BackButton'
import { Focus } from '../components/Focus'
import { Cover } from '../components/Cover'
import { Metadata } from '../components/Metadata'
import { ShowModel } from '../models/interfaces/ShowModel'
import { VideoModel } from '../models/interfaces/VideoModel'
import './Show.css'

const Show = (): JSX.Element|null => {
  const { id } = useParams()
  const history = useHistory()
  const [show, setShow] = useState<ShowModel|null>()
  const [videos, setVideos] = useState<VideoModel[]|undefined>()

  const onBack = (): void => {
    history.goBack()
  }

  useEffect(() => {
    getShow(id).then(show => setShow(show))
    getVideos(id).then(videos => setVideos(videos))
  }, [])

  if (!show) {
    return null
  }

  return (
    <>
      <Background image={show.backgroundImage} />
      <Focus id="back-button" onClick={onBack} downId="play-button" auto>
        <BackButton onClick={onBack} />
      </Focus>
      <div className="show-view">
        <Cover image={show.posterImage} />
        <Metadata data={show} videos={videos} />
      </div>
    </>
  )
}

export default Show
