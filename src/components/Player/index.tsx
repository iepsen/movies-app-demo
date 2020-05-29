import React, { useState, useEffect } from 'react'
import YouTube, { Options } from 'react-youtube'
import { IconButton } from '@material-ui/core'
import { PlayArrow, Pause, Stop, FastRewind, FastForward, ArrowBack } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import './Player.css'

type Props = {
  id: string
  onEnd: () => void
  onBack: () => void
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    backgroundColor: 'rgb(200, 200, 200)',
    color: 'rgb(32, 32, 32)',
    '&:hover, &:focus': {
      backgroundColor: 'rgb(94, 146, 108)'
    },
    width: '5rem',
    height: '5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  buttonBack: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    zIndex: 10
  },
  icon: {
    width: '100%',
    height: '100%'
  }
}))

const seekAmount = 10

let progressTimer: number

let visibilityTimer: number

const Player = ({ id, onBack, onEnd }: Props): JSX.Element => {
  const [player, setPlayer] = useState<YT.Player>()
  const [playerState, setPlayerState] = useState<number>()
  const [progress, setProgress] = useState<number>(0)
  const [visibleControls, setVisibleControls] = useState<boolean>(false)
  const classes = useStyles()
  const options: Options = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
      iv_load_policy: 3
    }
  }

  const onReady = (event: { target: YT.Player }): void => {
    setPlayer(event?.target)
  }

  const onStateChange = (event: { target: YT.Player, data: number }): void => {
    setPlayerState(event.data)
  }

  const onMouseMove = (): void => {
    setVisibleControls(true)
    clearTimeout(visibilityTimer)
    visibilityTimer = window.setTimeout(() => {
      setVisibleControls(false)
    }, 3000)
  }

  const onPlayPause = (): void => {
    if (!player) {
      return
    }
    if (player.getPlayerState() === YouTube.PlayerState.PLAYING) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
  }

  const onStop = (): void => {
    if (!player) {
      return
    }
    player.stopVideo()
  }

  const onFastRewind = (): void => {
    if (!player) {
      return
    }
    const time = player.getCurrentTime()
    const amount = time - seekAmount
    if (amount < 0) {
      player.seekTo(amount, true)
    }
  }

  const onFastForward = (): void => {
    if (!player) {
      return
    }
    const time = player.getCurrentTime()
    const duration = player.getDuration()
    const amount = time + seekAmount
    if (amount < duration) {
      player.seekTo(amount, true)
    }
  }

  useEffect(() => {
    progressTimer = window.setInterval(() => {
      if (!player) {
        return
      }
      const duration = player.getDuration()
      const currentTime = player.getCurrentTime()
      setProgress(currentTime * 100 / duration)
    }, 200)
    return () => clearInterval(progressTimer)
  })

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (player) {
        player.stopVideo()
      }
      clearInterval(progressTimer)
      clearTimeout(visibilityTimer)
    }
  }, [])

  return (
    <>
      <YouTube className="player" videoId={id} opts={options} onStateChange={onStateChange} onReady={onReady} onEnd={onEnd} />
      {visibleControls && (
        <div className="player-overlay">
          <div className="player-overlay-background" />
          <IconButton onClick={onBack} className={`${classes.button} ${classes.buttonBack}`}>
            <ArrowBack className={classes.icon} />
          </IconButton>
          <div className="player-progress">
            <progress value={progress} max="100"></progress>
          </div>
          <div className="player-controls">
            <IconButton onClick={onFastRewind} className={classes.button}>
              <FastRewind className={classes.icon} />
            </IconButton>
            <IconButton onClick={onPlayPause} className={classes.button}>
              {playerState === YouTube.PlayerState.PLAYING ? <Pause className={classes.icon} /> : <PlayArrow className={classes.icon} /> }
            </IconButton>
            <IconButton onClick={onStop} className={classes.button}>
              <Stop className={classes.icon} />
            </IconButton>
            <IconButton onClick={onFastForward} className={classes.button}>
              <FastForward className={classes.icon} />
            </IconButton>
          </div>
        </div>
      )}
    </>
  )
}

export { Player }
