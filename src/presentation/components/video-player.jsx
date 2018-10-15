import React from 'react'
import { VideoPlayerViewModel } from '../viewmodel/video-player'
import { deviceManager } from '../../manager/device-manager'
import css from '../styles/video-player.scss'

export class VideoPlayerComponent extends React.Component {
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
        deviceManager.subscribe(deviceManager.KEY_ANY, this.onKeyAny)
        deviceManager.subscribe(deviceManager.KEY_BACK, this.onKeyBack)
        deviceManager.subscribe(deviceManager.KEY_OK, this.onKeyOk)
        deviceManager.subscribe(deviceManager.KEY_SPACE, this.onKeySpace)
        deviceManager.subscribe(deviceManager.KEY_LEFT, this.onKeyLeft)
        deviceManager.subscribe(deviceManager.KEY_UP, this.onKeyUp)
        deviceManager.subscribe(deviceManager.KEY_RIGHT, this.onKeyRight)
        deviceManager.subscribe(deviceManager.KEY_DOWN, this.onKeyDown)
        deviceManager.subscribe(deviceManager.KEY_EXIT, this.onKeyExit)

        window.addEventListener('mousemove', this.onMouseMove)
        this.setVirtualFocusRefChange(this.state.virtualFocusRef)
        this.setHideInfoTimer()
    }

    componentWillUnmount() {
        deviceManager.unsubscribe(deviceManager.KEY_ANY)
        deviceManager.unsubscribe(deviceManager.KEY_BACK)
        deviceManager.unsubscribe(deviceManager.KEY_OK)
        deviceManager.unsubscribe(deviceManager.KEY_SPACE)
        deviceManager.unsubscribe(deviceManager.KEY_LEFT)
        deviceManager.unsubscribe(deviceManager.KEY_UP)
        deviceManager.unsubscribe(deviceManager.KEY_RIGHT)
        deviceManager.unsubscribe(deviceManager.KEY_DOWN)
        deviceManager.unsubscribe(deviceManager.KEY_EXIT)

        window.removeEventListener('mousemove', this.onMouseMove)
        clearTimeout(this.hideInfoTimer)
    }

    onKeyAny() {
        this.showInfo()
    }

    onKeyBack(watched) {
        if (this.props.onBack) {
            this.props.onBack(watched)
        }
    }

    onKeyOk() {
        if (this.state.virtualFocusRef === this.playPauseRef) this.togglePlayPause()
        if (this.state.virtualFocusRef === this.backRef) this.onKeyBack()
    }

    onKeySpace() {
        this.togglePlayPause()
    }

    onKeyExit() {
        if (this.props.onBack) {
            this.props.onBack()
        }
    }

    onKeyLeft() {
        this.seek(this.secondsToSeek * - 1)
    }

    onKeyUp() {
        this.setVirtualFocusRefChange(this.backRef)
    }

    onKeyRight() {
        this.seek(this.secondsToSeek)
    }
    
    onKeyDown() {
        this.setVirtualFocusRefChange(this.playPauseRef)
    }

    onMouseMove() {
        this.showInfo()
    }

    onClickBack() {
        this.onKeyBack()
    }

    onClickPlayPause() {
        this.togglePlayPause()
    }

    onClickProgress(event) {
        const offsetLeft = event.currentTarget.offsetLeft
        const clientX = event.clientX
        const clientWidth = event.currentTarget.clientWidth
        const percentage = ((clientX - offsetLeft) * 100 / clientWidth)
        this.seekToPercentage(percentage)
    }

    onEnded() {
        this.onKeyBack(true)
    }

    onCanPlay() {
        this.setState({
            remainingTime: this.getRemainingTime(0)
        })
        this.playPauseRef.current.focus()
    }

    onLoadedMetadata() {
        if (this.viewModel.progress > 0) {
            this.seekToPercentage(this.viewModel.progress)
        }
    }

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

    setVirtualFocusRefChange(virtualFocusRef) {
        this.clearVirtualFocusRefStyle()
        this.addVirtualFocusRefStyle(virtualFocusRef)
        this.setState({virtualFocusRef})
    }

    clearVirtualFocusRefStyle() {
        this.backRef.current.classList.remove(css.focused)
        this.playPauseRef.current.classList.remove(css.focused)
    }

    addVirtualFocusRefStyle(virtualFocusRef) {
        virtualFocusRef.current.classList.add(css.focused)
    }

    setHideInfoTimer() {
        clearTimeout(this.hideInfoTimer)
        this.hideInfoTimer = setTimeout(() => this.hideInfo(), 5000)
    }

    hideInfo() {
        this.topInfoRef.current.classList.add(css.top__info_hide)
        this.bottomInfoRef.current.classList.add(css.bottom_info__hide)
        this.infoRef.current.classList.add(css.info__hide)
    }

    showInfo() {
        this.topInfoRef.current.classList.remove(css.top__info_hide)
        this.bottomInfoRef.current.classList.remove(css.bottom__info_hide)
        this.infoRef.current.classList.remove(css.info__hide)
        this.setHideInfoTimer()
    }

    getDuration() {
        return this.playerRef.current.duration || 0
    }

    getCurrentTime() {
        return this.playerRef.current.currentTime
    }

    setCurrentTime(seconds) {
        this.playerRef.current.currentTime = seconds
    }

    getProgress(elapsedTime) {
        return elapsedTime * 100 / this.getDuration()
    }

    getRemainingTime(elapsedTime) {
        return new Date((this.getDuration() - elapsedTime) * 1000).toISOString().substr(11, 8)
    }

    seekToSeconds(seconds) {
        this.setCurrentTime(seconds)
    }

    seekToPercentage(percentage) {
        const duration = this.getDuration()
        const seconds = duration * percentage / 100
        this.seekToSeconds(seconds)
    }

    togglePlayPause() {
        this.playerRef.current.paused ? this.play() : this.pause()
    }

    play() {
        this.playerRef.current.play()
        this.playPauseRef.current.textContent = 'pause'
    }

    pause() {
        this.playerRef.current.pause()
        this.playPauseRef.current.textContent = 'play_arrow'
    }

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