import React, { useState, useEffect } from 'react'
import YouTube, { Options } from 'react-youtube'
import { PlayArrow, Pause, Stop, FastRewind, FastForward } from '@material-ui/icons'
import { LinearProgress } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Focus } from './Focus'
import { PlayerButton } from './PlayerButton'
import { BackButton } from './BackButton'
import { focusManager } from '../navigation'

const seekAmount = 10
let progressTimer: number
let visibilityTimer: number

type PlayerProps = {
  id: string
  onEnd: () => void
  onBack: () => void
}

const useStyles = makeStyles(() => ({
  icon: {
    width: '100%',
    height: '100%'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: '0.5',
    backgroundColor: 'black'
  },
  playerControls: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '8%',
    bottom: '10%',
    zIndex: 10
  },
  playerProgressContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '20%',
    justifyContent: 'center',
    width: '100%'
  }
}))

const ProgressBar = withStyles({
  root: {
    width: '80%',
    height: '0.5rem',
    backgroundColor: 'rgb(200, 200, 200)'
  },
  barColorPrimary: {
    backgroundColor: 'rgb(94, 146, 108)'
  }
})(LinearProgress)

export const Player = ({ id, onBack, onEnd }: PlayerProps): JSX.Element => {
  const [player, setPlayer] = useState<YT.Player>()
  const [playerState, setPlayerState] = useState<number>()
  const [progress, setProgress] = useState<number>(0)
  const [visibleControls, setVisibleControls] = useState<boolean>(true)
  const styles = useStyles()
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

  const onStateChange = (event: { target: YT.Player; data: number }): void => {
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
    onEnd()
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
      setProgress((currentTime * 100) / duration || 0)
    }, 200)
    return () => clearInterval(progressTimer)
  })

  useEffect(() => {
    const subscription = focusManager.subscribe({
      next: () => onMouseMove()
    })
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      subscription.unsubscribe()
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
      <YouTube
        className="player"
        videoId={id}
        opts={options}
        onStateChange={onStateChange}
        onReady={onReady}
        onEnd={onEnd}
      />
      {visibleControls && (
        <div className={styles.overlay}>
          <div className={styles.overlayBackground} />
          <Focus onClick={onBack} id="button-back" downId="button-play-pause">
            <BackButton onClick={onBack} />
          </Focus>
          <div className={styles.playerProgressContainer}>
            <ProgressBar variant="determinate" value={progress} />
          </div>
          <div className={styles.playerControls}>
            <Focus
              onClick={onFastRewind}
              id="button-rewind"
              rightId="button-play-pause"
              upId="button-back"
            >
              <PlayerButton onClick={onFastRewind}>
                <FastRewind className={styles.icon} />
              </PlayerButton>
            </Focus>
            <Focus
              onClick={onPlayPause}
              id="button-play-pause"
              leftId="button-rewind"
              rightId="button-stop"
              upId="button-back"
              autoFocus
            >
              <PlayerButton onClick={onPlayPause}>
                {playerState === YouTube.PlayerState.PLAYING ? (
                  <Pause className={styles.icon} />
                ) : (
                  <PlayArrow className={styles.icon} />
                )}
              </PlayerButton>
            </Focus>
            <Focus
              onClick={onStop}
              id="button-stop"
              leftId="button-play-pause"
              rightId="button-fast-forward"
              upId="button-back"
            >
              <PlayerButton onClick={onStop}>
                <Stop className={styles.icon} />
              </PlayerButton>
            </Focus>
            <Focus
              onClick={onFastForward}
              id="button-fast-forward"
              leftId="button-stop"
              upId="button-back"
            >
              <PlayerButton onClick={onFastForward}>
                <FastForward className={styles.icon} />
              </PlayerButton>
            </Focus>
          </div>
        </div>
      )}
    </>
  )
}
