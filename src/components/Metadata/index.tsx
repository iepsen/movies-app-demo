import React from 'react'
import { useHistory } from 'react-router-dom'
import { IMovieModel, IVideoModel } from '../../models/interfaces'
import { Focus } from '../Focus'
import { ActionButton } from '../ActionButton'
import './Metadata.css'

type Props = {
  data?: IMovieModel
  videos: IVideoModel[]
}

const Metadata = ({ data, videos = [] }: Props): JSX.Element | null => {
  const history = useHistory()
  let videoId = ''
  if (videos?.length) {
    const [video] = videos
    videoId = video.id
  }
  const onClick = () => history.push(`/video/${videoId}`)
  return (
    <div className="metadata">
      <h2>{data?.title}</h2>
      <p>
        <strong>{data?.genres}</strong>
      </p>
      <p>{data?.overview}</p>
      {videoId && (
        <Focus id="play-button" upId="back-button" onClick={onClick} autoFocus>
          <ActionButton onClick={onClick} text="Play Trailer" />
        </Focus>
      )}
    </div>
  )
}

export { Metadata }
