import React from 'react'
import { MovieModel } from '../../models/interfaces/MovieModel'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import './Metadata.css'

type Props = {
  data?: MovieModel
}

const useStyles = makeStyles((theme) => ({
  button: {
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

const Metadata = ({ data }: Props): JSX.Element|null => {
  const classes = useStyles()
  return (
    <div className="metadata">
      <h2>{data?.title}</h2>
      <p><strong>{data?.genres}</strong></p>
      <p>{data?.overview}</p>
      <Button
        href="#/video/hA6hldpSTF8"
        variant="contained"
        className={classes.button}
        startIcon={<PlayCircleOutlineIcon className={classes.icon} />}
      >
        Play Trailer
      </Button>
    </div>
  )
}

export { Metadata }
