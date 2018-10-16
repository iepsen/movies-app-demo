/** @module presentation/components */
import React from 'react'
import { VideoPlayerViewModel } from '../viewmodel/video-player'
import { deviceManager } from '../../manager/device-manager'
import css from '../styles/video-player.scss'

/**
 * VideoPlayerComponent
 */
export class VideoPlayerComponent extends React.Component {
    /**
     * Initialize the VideoPlayerComponent
     * @param {React.Props} props - The component props
     */
    constructor(props) {
        super(props)
        this.viewModel = new VideoPlayerViewModel(props.data).get()

        // Keyboard binding
        this.onKeyAny = this.onKeyAny.bind(this)
        this.onKeyOk = this.onKeyOk.bind(this)
        this.onKeyBack = this.onKeyBack.bind(this)
        this.onKeySpace = this.onKeySpace.bind(this)
        this.onKeyLeft = this.onKeyLeft.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
        this.onKeyRight = this.onKeyRight.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onKeyExit = this.onKeyExit.bind(this)

        // Mouse binding
        this.onClickPlayPause = this.onClickPlayPause.bind(this)
        this.onClickProgress = this.onClickProgress.bind(this)
        this.onClickBack = this.onClickBack.bind(this)

        // Player binding
        this.onTimeUpdate = this.onTimeUpdate.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onLoadedMetadata = this.onLoadedMetadata.bind(this)
        this.onCanPlay = this.onCanPlay.bind(this)
        this.onEnded = this.onEnded.bind(this)

        // React references
        this.playerRef = React.createRef()
        this.backRef = React.createRef()
        this.playPauseRef = React.createRef()
        this.progressRef = React.createRef()
        this.infoRef = React.createRef()
        this.topInfoRef = React.createRef()
        this.bottomInfoRef = React.createRef()

        this.hideInfoTimer = null
        this.secondsToSeek = 15

        this.state = {
            remainingTime: '00:00:00',
            watched: 0,
            virtualFocusRef: this.playPauseRef
        }
    }

    componentDidMount() {
        this.subscribe()
        window.addEventListener('mousemove', this.onMouseMove)
        this.setVirtualFocusRefChange(this.state.virtualFocusRef)
        this.setHideInfoTimer()
    }

    componentWillUnmount() {
        this.unsubscribe()
        window.removeEventListener('mousemove', this.onMouseMove)
        clearTimeout(this.hideInfoTimer)
    }

    /**
     * Dispatch on any pressed key
     */
    onKeyAny() {
        this.showInfo()
    }

    /**
     * Dispatch on user press back key
     * @param {string} watched - Seconds watched
     */
    onKeyBack(watched) {
        if (this.props.onBack) {
            this.props.onBack(watched)
        }
    }

    /**
     * Dispatch on user press ok key
     */
    onKeyOk() {
        if (this.state.virtualFocusRef === this.playPauseRef) this.togglePlayPause()
        if (this.state.virtualFocusRef === this.backRef) this.onKeyBack()
    }

    /**
     * Dispatch on user press space key
     */
    onKeySpace() {
        this.togglePlayPause()
    }

    /**
     * Dispatch on user press exit key
     */
    onKeyExit() {
        if (this.props.onBack) {
            this.props.onBack()
        }
    }

    /**
     * Dispatch on user press left key
     */
    onKeyLeft() {
        this.seek(this.secondsToSeek * - 1)
    }

    /**
     * Dispatch on user press up key
     */
    onKeyUp() {
        this.setVirtualFocusRefChange(this.backRef)
    }

    /**
     * Dispatch on user press right key
     */
    onKeyRight() {
        this.seek(this.secondsToSeek)
    }
    
    /**
     * Dispatch on user press down key
     */
    onKeyDown() {
        this.setVirtualFocusRefChange(this.playPauseRef)
    }

    /**
     * Dispatch on user moves the mouse
     */
    onMouseMove() {
        this.showInfo()
    }

    /**
     * Dispatch on user click on the back button
     */
    onClickBack() {
        this.onKeyBack()
    }

    /**
     * Dispatch on user click on the play/pause button
     */
    onClickPlayPause() {
        this.togglePlayPause()
    }

    /**
     * Dispatch on user click on the progress bar
     * and seek to a position
     * @param {MouseEvent} event - The MouseEvent
     */
    onClickProgress(event) {
        const offsetLeft = event.currentTarget.offsetLeft
        const clientX = event.clientX
        const clientWidth = event.currentTarget.clientWidth
        const percentage = ((clientX - offsetLeft) * 100 / clientWidth)
        this.seekToPercentage(percentage)
    }

    /**
     * Dispatch on playback ends
     */
    onEnded() {
        this.onKeyBack(true)
    }

    /**
     * Dispatch on the onCanPlay video event is fired and put
     * focus on the play/pause button.
     */
    onCanPlay() {
        this.setState({remainingTime: this.getRemainingTime(0)})
        this.playPauseRef.current.focus()
    }

    /**
     * Dispatch on the onLoadedMetadata video event is fired
     * and seek to a position if user has watched history.
     */
    onLoadedMetadata() {
        if (this.viewModel.progress > 0) {
            this.seekToPercentage(this.viewModel.progress)
        }
    }

    /**
     * Dispatch on the onTimeUpdate video event is fired
     * and pass to the parent component the time watched.
     */
    onTimeUpdate() {
        const elapsedTime = Math.ceil(this.getCurrentTime())
        this.setState({
            remainingTime: this.getRemainingTime(elapsedTime),
            watched: this.getProgress(elapsedTime)
        })

        if (this.props.onTimeUpdate) {
            this.props.onTimeUpdate(this.state.watched)
        }
    }

    /**
     * Subscribe the keys to navigate on the VideoPlayerComponent
     */
    subscribe() {
        deviceManager.subscribe(deviceManager.KEY_ANY, this.onKeyAny)
        deviceManager.subscribe(deviceManager.KEY_BACK, this.onKeyBack)
        deviceManager.subscribe(deviceManager.KEY_OK, this.onKeyOk)
        deviceManager.subscribe(deviceManager.KEY_SPACE, this.onKeySpace)
        deviceManager.subscribe(deviceManager.KEY_LEFT, this.onKeyLeft)
        deviceManager.subscribe(deviceManager.KEY_UP, this.onKeyUp)
        deviceManager.subscribe(deviceManager.KEY_RIGHT, this.onKeyRight)
        deviceManager.subscribe(deviceManager.KEY_DOWN, this.onKeyDown)
        deviceManager.subscribe(deviceManager.KEY_EXIT, this.onKeyExit)
    }

    /**
     * Unsubscribe the keys on the VideoPlayerComponent
     */
    unsubscribe() {
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
     * @param {React.Ref} virtualFocusRef - The Reference to focus
     */
    setVirtualFocusRefChange(virtualFocusRef) {
        this.clearVirtualFocusRefStyle()
        this.addVirtualFocusRefStyle(virtualFocusRef)
        this.setState({virtualFocusRef})
    }

    /**
     * Clear the focused reference
     */
    clearVirtualFocusRefStyle() {
        this.backRef.current.classList.remove(css.focused)
        this.playPauseRef.current.classList.remove(css.focused)
    }

    /**
     * Add a css style to a reference
     * @param {React.Ref} virtualFocusRef - The Reference to focus
     */
    addVirtualFocusRefStyle(virtualFocusRef) {
        virtualFocusRef.current.classList.add(css.focused)
    }

    /**
     * Restart the info timer
     */
    setHideInfoTimer() {
        clearTimeout(this.hideInfoTimer)
        this.hideInfoTimer = setTimeout(() => this.hideInfo(), 5000)
    }

    /**
     * Hide the info layer
     */
    hideInfo() {
        this.topInfoRef.current.classList.add(css.top__info_hide)
        this.bottomInfoRef.current.classList.add(css.bottom_info__hide)
        this.infoRef.current.classList.add(css.info__hide)
    }

    /**
     * Show the info layer
     */
    showInfo() {
        this.topInfoRef.current.classList.remove(css.top__info_hide)
        this.bottomInfoRef.current.classList.remove(css.bottom__info_hide)
        this.infoRef.current.classList.remove(css.info__hide)
        this.setHideInfoTimer()
    }

    /**
     * Get the playback duration
     */
    getDuration() {
        return this.playerRef.current.duration || 0
    }

    /**
     * Get the playback current time
     */
    getCurrentTime() {
        return this.playerRef.current.currentTime
    }

    /**
     * Set the current time
     * @param {number} seconds - Seconds to set current time
     */
    setCurrentTime(seconds) {
        this.playerRef.current.currentTime = seconds
    }

    /**
     * Get the elapsed seconds 
     * @param {number} elapsedTime - Seconds elapsed
     */
    getProgress(elapsedTime) {
        return elapsedTime * 100 / this.getDuration()
    }

    /**
     * Get the time remaining
     * @param {number} elapsedTime - Seconds elapsed
     */
    getRemainingTime(elapsedTime) {
        return new Date((this.getDuration() - elapsedTime) * 1000).toISOString().substr(11, 8)
    }

    /**
     * Seek to a position based on seconds
     * @param {number} seconds - Seconds to seek
     */
    seekToSeconds(seconds) {
        this.setCurrentTime(seconds)
    }

    /**
     * Seek to a position based on percentage
     * @param {number} percentage - Percentage to seek
     */
    seekToPercentage(percentage) {
        const duration = this.getDuration()
        const seconds = duration * percentage / 100
        this.seekToSeconds(seconds)
    }

    /**
     * Toggle the play/pause
     */
    togglePlayPause() {
        this.playerRef.current.paused ? this.play() : this.pause()
    }

    /**
     * Call the play video method
     */
    play() {
        this.playerRef.current.play()
        this.playPauseRef.current.textContent = 'pause'
    }

    /**
     * Call the pause video method
     */
    pause() {
        this.playerRef.current.pause()
        this.playPauseRef.current.textContent = 'play_arrow'
    }

    /**
     * Seek to a position
     * @param {number} seconds - Seconds to increment
     */
    seek(seconds) {
        const currentTime = this.getCurrentTime()
        this.seekToSeconds(currentTime + seconds)
    }

    render() {
        return (
            <div className={css.player}>
                <video autoPlay ref={this.playerRef} onLoadedMetadata={this.onLoadedMetadata} onEnded={this.onEnded} onCanPlay={this.onCanPlay} onTimeUpdate={this.onTimeUpdate} src={this.viewModel.videoUrl} />
                <div ref={this.infoRef} className={css.info}>
                    <div ref={this.topInfoRef} className={css.top__info}>
                        <i onClick={this.onClickBack} ref={this.backRef} className={css.material__icons}>arrow_back</i>
                        <h1 className={css.title}>{this.viewModel.title}</h1>
                    </div>
                    <div ref={this.bottomInfoRef} className={css.bottom__info}>
                        <i onClick={this.onClickPlayPause} ref={this.playPauseRef} className={css.material__icons}>pause</i>
                        <progress onClick={this.onClickProgress} ref={this.progressRef} value={this.state.watched} max={100}></progress>
                        <span>{this.state.remainingTime}</span>
                    </div>
                </div>
            </div>
        )
    }
}