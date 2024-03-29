import { makeStyles } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { IMovieModel, IVideoModel } from '../models/interfaces'
import { Focus } from './Focus'
import { ActionButton } from './ActionButton'
import { ReactElement } from 'react'

type MetadataProps = {
  data?: IMovieModel
  videos: IVideoModel[]
}

const useStyles = makeStyles(() => ({
  container: {
    paddingLeft: '3rem',
    width: '70%'
  },
  title: {
    fontSize: '3rem',
    lineHeight: '3.5rem',
    marginBottom: '2%'
  },
  genres: {
    fontSize: '1.8rem',
    lineHeight: '2.4rem',
    marginBottom: '1%',
    color: 'rgb(144, 206, 161)'
  },
  actionButton: {
    marginTop: '3%'
  }
}))

export const Metadata = ({
  data,
  videos = []
}: MetadataProps): ReactElement => {
  const styles = useStyles()
  const navigate = useNavigate()

  let videoId = ''
  if (videos?.length) {
    const [video] = videos
    videoId = video.id
  }

  const onSelect = () => navigate(`/video/${videoId}`)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{data?.title}</h2>
      <p className={styles.genres}>
        <strong>{data?.genres}</strong>
      </p>
      <p>{data?.overview}</p>
      {videoId && (
        <Focus
          id="play-button"
          leftId="back-button"
          topId="back-button"
          onSelect={onSelect}
          autoFocus
        >
          <ActionButton
            className={styles.actionButton}
            onClick={onSelect}
            text="Play Trailer"
          />
        </Focus>
      )}
    </div>
  )
}
