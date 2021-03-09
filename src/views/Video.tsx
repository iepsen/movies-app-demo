import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Player } from '../components/Player'

const Video = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  const onBack = (): void => {
    history.goBack()
  }

  const onEnd = (): void => {
    history.goBack()
  }

  return <Player id={id} onBack={onBack} onEnd={onEnd} />
}

export { Video }
