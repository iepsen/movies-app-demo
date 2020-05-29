import React from 'react'
import { useParams } from 'react-router-dom'
import { Player } from '../components/Player'

const Video = (): JSX.Element => {
  const { id } = useParams()
  return (
    <Player id={id} />
  )
}

export default Video
