import { useState, useEffect, ReactElement } from 'react'
import YouTube, { Options } from 'react-youtube'
import { PlayerControls } from './PlayerControls'
import { YouTubePlayer } from 'youtube-player/dist/types'

const seekAmount = 10
let progressTimer: number
let visibilityTimer: number

type PlayerProps = {
  id?: string
  onEnd: () => void
  onBack: () => void
}

export const Player = ({ id, onBack, onEnd }: PlayerProps): ReactElement => {
  const [player, setPlayer] = useState<YouTubePlayer>()
  const [playerState, setPlayerState] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [visibleControls, setVisibleControls] = useState<boolean>(true)
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

  const onReady = (event: { target: YouTubePlayer }): void =>
    setPlayer(event?.target)

  const onStateChange = (event: {
    target: YouTubePlayer
    data: number
  }): void => setPlayerState(event.data)

  const onMouseMove = (): void => {
    setVisibleControls(true)
    clearTimeout(visibilityTimer)
    visibilityTimer = window.setTimeout(() => {
      setVisibleControls(false)
    }, 3000)
  }

  const onPlayPause = async (): Promise<void> => {
    if (!player) {
      return
    }
    if ((await player.getPlayerState()) === YouTube.PlayerState.PLAYING) {
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

  const onRewind = async (): Promise<void> => {
    if (!player) {
      return
    }
    const time = player.getCurrentTime()
    const amount = (await time) - seekAmount
    if (amount > 0) {
      player.seekTo(amount, true)
    }
  }

  const onFastForward = async (): Promise<void> => {
    if (!player) {
      return
    }
    const time = player.getCurrentTime()
    const duration = player.getDuration()
    const amount = (await time) + seekAmount
    if (amount < (await duration)) {
      player.seekTo(amount, true)
    }
  }

  useEffect(() => {
    progressTimer = window.setInterval(async () => {
      if (!player) {
        return
      }
      const duration = player.getDuration()
      const currentTime = player.getCurrentTime()
      setProgress(((await currentTime) * 100) / (await duration) || 0)
    }, 200)
    return () => clearInterval(progressTimer)
  })

  useEffect(() => {
    onMouseMove()
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (player) {
        player.stopVideo()
      }
      clearInterval(progressTimer)
      clearTimeout(visibilityTimer)
    }
  }, [player])

  return (
    <>
      <YouTube
        videoId={id}
        opts={options}
        onStateChange={onStateChange}
        onReady={onReady}
        onEnd={onEnd}
      />
      {visibleControls && (
        <PlayerControls
          onBack={onBack}
          onFastForward={onFastForward}
          onRewind={onRewind}
          onPlayPause={onPlayPause}
          onStop={onStop}
          progress={progress}
          playerState={playerState}
        />
      )}
    </>
  )
}
