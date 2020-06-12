import React from 'react'
import { useHistory } from 'react-router-dom'
import { MovieModel } from '../../models/interfaces/MovieModel'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import './Metadata.css'
import { VideoModel } from '../../models/interfaces/VideoModel'
import Focus from '../Focus'

type Props = {
  data?: MovieModel
  videos?: VideoModel[]
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: 'rgb(200, 200, 200)',
    width: '20rem',
    height: '5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  buttonFocused: {
    margin: theme.spacing(1),
    backgroundColor: 'rgb(144, 206, 161)',
    width: '20rem',
    height: '5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  icon: {
    width: '3rem',
    height: '3rem'
  }
}))

const Metadata = ({ data, videos }: Props): JSX.Element|null => {
  const classes = useStyles()
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
      <p><strong>{data?.genres}</strong></p>
      <p>{data?.overview}</p>
      {videoId && (
        <Focus id="play-button" upId="back-button" onClick={onClick}>
          <Button
            href={`#/video/${videoId}`}
            variant="contained"
            className={classes.button}
            startIcon={<PlayCircleOutlineIcon className={classes.icon} />}
          >
            Play Trailer
          </Button>
        </Focus>
      )}
    </div>
  )
}

export { Metadata }
