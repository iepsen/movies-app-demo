import { ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Player } from '../components/Player'
import { Section } from '../components/Section'

const Video = (): ReactElement => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const onBack = (): void => {
    navigate(-1)
  }

  const onEnd = (): void => {
    navigate(-1)
  }

  return (
    <Section id="player-view" onBack={onBack} active>
      <Player id={id} onBack={onBack} onEnd={onEnd} />
    </Section>
  )
}

export { Video }
