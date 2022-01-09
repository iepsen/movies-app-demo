import { makeStyles, withStyles } from '@material-ui/core/styles'
import { LinearProgress } from '@material-ui/core'
import YouTube from 'react-youtube'
import { BackButton } from './BackButton'
import { Focus } from './Focus'
import { PlayerButton } from './PlayerButton'
import {
  FastRewind,
  Stop,
  FastForward,
  Pause,
  PlayArrow
} from '@material-ui/icons'
import { ReactElement } from 'react'

type PlayerControlsProps = {
  onPlayPause: () => void
  onStop: () => void
  onRewind: () => void
  onFastForward: () => void
  onBack: () => void
  playerState: number
  progress: number
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

export const PlayerControls = ({
  onStop,
  onFastForward,
  onRewind,
  onPlayPause,
  onBack,
  playerState,
  progress
}: PlayerControlsProps): ReactElement => {
  const styles = useStyles()
  return (
    <div className={styles.overlay}>
      <div className={styles.overlayBackground} />
      <Focus onSelect={onBack} id="button-back" bottomId="button-play-pause">
        <BackButton onClick={onBack} />
      </Focus>
      <div className={styles.playerProgressContainer}>
        <ProgressBar variant="determinate" value={progress} />
      </div>
      <div className={styles.playerControls}>
        <Focus
          onSelect={onRewind}
          id="button-rewind"
          rightId="button-play-pause"
          topId="button-back"
        >
          <PlayerButton onSelect={onRewind}>
            <FastRewind className={styles.icon} />
          </PlayerButton>
        </Focus>
        <Focus
          onSelect={onPlayPause}
          id="button-play-pause"
          leftId="button-rewind"
          rightId="button-stop"
          topId="button-back"
          autoFocus
        >
          <PlayerButton onSelect={onPlayPause}>
            {playerState === YouTube.PlayerState.PLAYING ? (
              <Pause className={styles.icon} />
            ) : (
              <PlayArrow className={styles.icon} />
            )}
          </PlayerButton>
        </Focus>
        <Focus
          onSelect={onStop}
          id="button-stop"
          leftId="button-play-pause"
          rightId="button-fast-forward"
          topId="button-back"
        >
          <PlayerButton onSelect={onStop}>
            <Stop className={styles.icon} />
          </PlayerButton>
        </Focus>
        <Focus
          onSelect={onFastForward}
          id="button-fast-forward"
          leftId="button-stop"
          topId="button-back"
        >
          <PlayerButton onSelect={onFastForward}>
            <FastForward className={styles.icon} />
          </PlayerButton>
        </Focus>
      </div>
    </div>
  )
}
