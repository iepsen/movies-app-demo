import { useState, useEffect, ReactElement } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getShow, getShowVideos } from '../services'
import { Background } from '../components/Background'
import { BackButton } from '../components/BackButton'
import { Focus } from '../components/Focus'
import { Cover } from '../components/Cover'
import { Metadata } from '../components/Metadata'
import { IShowModel, IVideoModel } from '../models/interfaces'
import './Show.css'

const Show = (): ReactElement => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const [show, setShow] = useState<IShowModel | undefined>()
  const [videos, setVideos] = useState<IVideoModel[]>([])

  const onBack = (): void => {
    history.goBack()
  }

  useEffect(() => {
    getShow(id).then(show => setShow(show))
    getShowVideos(id).then(videos => setVideos(videos))
  }, [])

  return (
    <>
      <Background image={show?.backgroundImage} />
      <Focus id="back-button" onClick={onBack} downId="play-button" autoFocus>
        <BackButton onClick={onBack} />
      </Focus>
      <div className="show-view">
        <Cover image={show?.posterImage} />
        <Metadata data={show} videos={videos} />
      </div>
    </>
  )
}

export { Show }
