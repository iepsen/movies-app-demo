/** @module presentation/components */
import React, { useRef, useState, useEffect } from 'react'
import { VideoPlayerViewModel } from '../viewmodel/video-player'
import { deviceManager } from '../../manager/device-manager'
import css from '../styles/video-player.scss'

/**
 * VideoPlayerComponent
 */
const VideoPlayerComponent = ({ data, onBack, onTimeUpdate }) => {
    const viewModel = new VideoPlayerViewModel(data).get()
    const playerRef = useRef()
    const backRef = useRef()
    const playPauseRef = useRef()
    const progressRef = useRef()
    const infoRef = useRef()
    const topInfoRef = useRef()
    const bottomInfoRef = useRef()

    const [remainingTime, setRemainingTime] = useState('00:00:00')
    const [watched, setWatched] = useState(0)
    const [focusRef, setfocusRef] = useState(0)

    let hideInfoTimer = null
    const secondsToSeek = 15

    /**
     * Dispatch on any pressed key
     */
    const onKeyAny = () => {
        showInfo()
    }

    /**
     * Dispatch on user press back key
     * @param {string} watched - Seconds watched
     */
    const onKeyBack = watched => {
        if (onBack) {
            onBack(watched)
        }
    }

    /**
     * Dispatch on user press ok key
     */
    const onKeyOk = () => {
        if (focusRef === playPauseRef) togglePlayPause()
        if (focusRef === backRef) onKeyBack()
    }

    /**
     * Dispatch on user press space key
     */
    const onKeySpace = () => {
        togglePlayPause()
    }

    /**
     * Dispatch on user press exit key
     */
    const onKeyExit = () => {
        if (onBack) {
            onBack()
        }
    }

    /**
     * Dispatch on user press left key
     */
    const onKeyLeft = () => {
        seek(secondsToSeek * - 1)
    }

    /**
     * Dispatch on user press up key
     */
    const onKeyUp = () => {
        setFocus(backRef)
    }

    /**
     * Dispatch on user press right key
     */
    const onKeyRight = () => {
        seek(secondsToSeek)
    }
    
    /**
     * Dispatch on user press down key
     */
    const onKeyDown = () => {
        setFocus(playPauseRef)
    }

    /**
     * Dispatch on user moves the mouse
     */
    const onMouseMove = () => {
        showInfo()
    }

    /**
     * Dispatch on user click on the back button
     */
    const onClickBack = () => {
        onKeyBack()
    }

    /**
     * Dispatch on user click on the play/pause button
     */
    const onClickPlayPause = () => {
        togglePlayPause()
    }

    /**
     * Dispatch on user click on the progress bar
     * and seek to a position
     * @param {MouseEvent} event - The MouseEvent
     */
    const onClickProgress = event => {
        const offsetLeft = event.currentTarget.offsetLeft
        const clientX = event.clientX
        const clientWidth = event.currentTarget.clientWidth
        const percentage = ((clientX - offsetLeft) * 100 / clientWidth)
        seekToPercentage(percentage)
    }

    /**
     * Dispatch on playback ends
     */
    const triggerOnEnded = () => {
        onKeyBack(true)
    }

    /**
     * Dispatch on the onCanPlay video event is fired and put
     * focus on the play/pause button.
     */
    const triggerOnCanPlay = () => {
        setRemainingTime(getRemainingTime(0))
        playPauseRef.current.focus()
    }

    /**
     * Dispatch on the onLoadedMetadata video event is fired
     * and seek to a position if user has watched history.
     */
    const triggerOnLoadedMetadata = () => {
        if (viewModel.progress > 0) {
            seekToPercentage(viewModel.progress)
        }
    }

    /**
     * Dispatch on the onTimeUpdate video event is fired
     * and pass to the parent component the time watched.
     */
    const triggerOnTimeUpdate = () => {
        const elapsedTime = Math.ceil(getCurrentTime())
        setRemainingTime(getRemainingTime(elapsedTime))
        setWatched(getProgress(elapsedTime))
        if (onTimeUpdate) {
            onTimeUpdate(watched)
        }
    }

    /**
     * Subscribe the keys to navigate on the VideoPlayerComponent
     */
    const subscribe = () => {
        deviceManager.subscribe(deviceManager.KEY_ANY, onKeyAny)
        deviceManager.subscribe(deviceManager.KEY_BACK, onKeyBack)
        deviceManager.subscribe(deviceManager.KEY_OK, onKeyOk)
        deviceManager.subscribe(deviceManager.KEY_SPACE, onKeySpace)
        deviceManager.subscribe(deviceManager.KEY_LEFT, onKeyLeft)
        deviceManager.subscribe(deviceManager.KEY_UP, onKeyUp)
        deviceManager.subscribe(deviceManager.KEY_RIGHT, onKeyRight)
        deviceManager.subscribe(deviceManager.KEY_DOWN, onKeyDown)
        deviceManager.subscribe(deviceManager.KEY_EXIT, onKeyExit)
    }

    /**
     * Unsubscribe the keys on the VideoPlayerComponent
     */
    const unsubscribe = () => {
        deviceManager.unsubscribe(deviceManager.KEY_ANY)
        deviceManager.unsubscribe(deviceManager.KEY_BACK)
        deviceManager.unsubscribe(deviceManager.KEY_OK)
        deviceManager.unsubscribe(deviceManager.KEY_SPACE)
        deviceManager.unsubscribe(deviceManager.KEY_LEFT)
        deviceManager.unsubscribe(deviceManager.KEY_UP)
        deviceManager.unsubscribe(deviceManager.KEY_RIGHT)
        deviceManager.unsubscribe(deviceManager.KEY_DOWN)
        deviceManager.unsubscribe(deviceManager.KEY_EXIT)
    }
    
    /**
     * Set the reference to focus
     * @param {React.Ref} focusRef - The Reference to focus
     */
    const setFocus = focusRef => {
        setTimeout(() => {
            clearFocus()
            addFocus(focusRef)
            setfocusRef(focusRef)
        }, 10)
    }

    /**
     * Clear the focused style reference
     */
    const clearFocus = () => {
        backRef.current.classList.remove(css.focused)
        playPauseRef.current.classList.remove(css.focused)
    }

    /**
     * Add a css style to a reference
     * @param {React.Ref} focusRef - The Reference to focus
     */
    const addFocus = focusRef => {
        focusRef.current.classList.add(css.focused)
    }

    /**
     * Restart the info timer
     */
    const setHideInfoTimer = () => {
        clearTimeout(hideInfoTimer)
        hideInfoTimer = setTimeout(() => hideInfo(), 5000)
    }

    /**
     * Hide the info layer
     */
    const hideInfo = () => {
        topInfoRef.current.classList.add(css.top__info_hide)
        bottomInfoRef.current.classList.add(css.bottom_info__hide)
        infoRef.current.classList.add(css.info__hide)
    }

    /**
     * Show the info layer
     */
    const showInfo = () => {
    topInfoRef.current.classList.remove(css.top__info_hide)
        bottomInfoRef.current.classList.remove(css.bottom__info_hide)
        infoRef.current.classList.remove(css.info__hide)
        setHideInfoTimer()
    }

    /**
     * Get the playback duration
     */
    const getDuration = () => {
        return playerRef.current.duration || 0
    }

    /**
     * Get the playback current time
     */
    const getCurrentTime = () => {
        return playerRef.current.currentTime
    }

    /**
     * Set the current time
     * @param {number} seconds - Seconds to set current time
     */
    const setCurrentTime = seconds => {
        playerRef.current.currentTime = seconds
    }

    /**
     * Get the elapsed seconds 
     * @param {number} elapsedTime - Seconds elapsed
     */
    const getProgress = elapsedTime => {
        return elapsedTime * 100 / getDuration()
    }

    /**
     * Get the time remaining
     * @param {number} elapsedTime - Seconds elapsed
     */
    const getRemainingTime = elapsedTime => {
        return new Date((getDuration() - elapsedTime) * 1000).toISOString().substr(11, 8)
    }

    /**
     * Seek to a position based on seconds
     * @param {number} seconds - Seconds to seek
     */
    const seekToSeconds = seconds => {
        setCurrentTime(seconds)
    }

    /**
     * Seek to a position based on percentage
     * @param {number} percentage - Percentage to seek
     */
    const seekToPercentage = percentage => {
        const duration = getDuration()
        const seconds = duration * percentage / 100
        seekToSeconds(seconds)
    }

    /**
     * Toggle the play/pause
     */
    const togglePlayPause = () => {
        playerRef.current.paused ? play() : pause()
    }

    /**
     * Call the play video method
     */
    const play = () => {
        playerRef.current.play()
        playPauseRef.current.textContent = 'pause'
    }

    /**
     * Call the pause video method
     */
    const pause = () => {
        playerRef.current.pause()
        playPauseRef.current.textContent = 'play_arrow'
    }

    /**
     * Seek to a position
     * @param {number} seconds - Seconds to increment
     */
    const seek = seconds => {
        const currentTime = getCurrentTime()
        seekToSeconds(currentTime + seconds)
    }

    useEffect(() => {
        subscribe()
        window.addEventListener('mousemove', onMouseMove)
        setFocus(focusRef)
        setHideInfoTimer()
        return () => {
            unsubscribe()
            window.removeEventListener('mousemove', onMouseMove)
            clearTimeout(hideInfoTimer)
            }
    }, [])

    return (
        <div className={css.player}>
            <video autoPlay ref={playerRef} onLoadedMetadata={triggerOnLoadedMetadata} onEnded={triggerOnEnded} onCanPlay={triggerOnCanPlay} onTimeUpdate={triggerOnTimeUpdate} src={viewModel.videoUrl} />
            <div ref={infoRef} className={css.info}>
                <div ref={topInfoRef} className={css.top__info}>
                    <i onClick={onClickBack} ref={backRef} className={css.material__icons}>arrow_back</i>
                    <h1 className={css.title}>{viewModel.title}</h1>
                </div>
                <div ref={bottomInfoRef} className={css.bottom__info}>
                    <i onClick={onClickPlayPause} ref={playPauseRef} className={css.material__icons}>pause</i>
                    <progress onClick={onClickProgress} ref={progressRef} value={watched} max={100}></progress>
                    <span>{remainingTime}</span>
                </div>
            </div>
        </div>
    )
}

export { VideoPlayerComponent }