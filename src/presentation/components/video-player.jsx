import React from 'react'
import { VideoPlayerViewModel } from '../viewmodel/video-player'
import css from '../styles/video-player.scss'

export class VideoPlayerComponent extends React.Component {
    constructor(props) {
        super(props)

        this.onTimeUpdate = this.onTimeUpdate.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onCanPlay = this.onCanPlay.bind(this)
        this.onMouseSeekProgress = this.onMouseSeekProgress.bind(this)
        this.onEnded = this.onEnded.bind(this)
        this.onBack = this.onBack.bind(this)
        this.onPlayPause = this.onPlayPause.bind(this)

        this.playerRef = React.createRef()
        this.backRef = React.createRef()
        this.playPauseRef = React.createRef()
        this.progressRef = React.createRef()
        this.infoRef = React.createRef()
        this.topInfoRef = React.createRef()
        this.bottomInfoRef = React.createRef()

        this.hideInfoTimer = null
        this.onSeekTimer = null
        this.secondsToSeek = 15

        this.viewModel = new VideoPlayerViewModel(props.data).get()
        this.state = {
            remainingTime: '00:00:00',
            watched: 0,
            virtualFocusRef: this.playPauseRef
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown)
        window.addEventListener('mousemove', this.onMouseMove)
        this.onVirtualFocusRefChange(this.state.virtualFocusRef)
        this.setHideInfoTimer()
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('mousemove', this.onMouseMove)
        clearTimeout(this.hideInfoTimer)
        clearTimeout(this.onSeekTimer)
    }

    onMouseMove() {
        this.showInfo()
    }

    onKeyDown(event) {
        this.showInfo()
        switch(event.keyCode) {
        case 8:
            this.onBack()
            break
        case 13:
            if (this.state.virtualFocusRef === this.playPauseRef) this.onPlayPause()
            if (this.state.virtualFocusRef === this.backRef) this.onBack()
            break
        case 32:
            this.onPlayPause()
            break
        case 37:
            this.onSeek(this.secondsToSeek * - 1)
            break
        case 27:
            this.onBack()
            break
        case 38:
            this.onVirtualFocusRefChange(this.backRef)
            break
        case 39:
            this.onSeek(this.secondsToSeek)
            break
        case 40:
            this.onVirtualFocusRefChange(this.playPauseRef)
            break
        }
    }

    onVirtualFocusRefChange(virtualFocusRef) {
        this.clearVirtualFocusRefStyle()
        this.addVirtualFocusRefStyle(virtualFocusRef)
        this.setState({virtualFocusRef})
    }

    onMouseSeekProgress(event) {
        const offsetLeft = event.currentTarget.offsetLeft
        const clientX = event.clientX
        const clientWidth = event.currentTarget.clientWidth
        const percentage = ((clientX - offsetLeft) * 100 / clientWidth)
        this.seekToPercentage(percentage)
    }

    onPlayPause() {
        let icon = ''
        if (this.playerRef.current.paused) {
            this.playerRef.current.play()
            icon = 'pause_arrow'
        } else {
            this.playerRef.current.pause()
            icon = 'play_arrow'
        }
        this.playPauseRef.current.textContent = icon
    }

    onSeek(seconds) {
        clearTimeout(this.onSeekTimer)
        const currentTime = this.getCurrentTime()
        this.seekToSeconds(currentTime + seconds)
    }

    onBack() {
        if (this.props.onBack) {
            this.props.onBack()
        }
    }

    onEnded() {
        this.onBack()
    }

    onCanPlay() {
        this.setState({
            remainingTime: this.getRemainingTime(0)
        })

        this.playPauseRef.current.focus()
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

    setHideInfoTimer() {
        // clearTimeout(this.hideInfoTimer)
        // this.hideInfoTimer = setTimeout(() => this.hideInfo(), 5000)
    }

    hideInfo() {
        this.topInfoRef.current.classList.add(css.top_info__hide)
        this.bottomInfoRef.current.classList.add(css.bottom_info__hide)
        this.infoRef.current.classList.add(css.info__hide)
    }

    showInfo() {
        this.topInfoRef.current.classList.remove(css.top_info__hide)
        this.bottomInfoRef.current.classList.remove(css.bottom_info__hide)
        this.infoRef.current.classList.remove(css.info__hide)
        this.setHideInfoTimer()
    }

    clearVirtualFocusRefStyle() {
        this.backRef.current.classList.remove(css.focused)
        this.playPauseRef.current.classList.remove(css.focused)
    }

    addVirtualFocusRefStyle(virtualFocusRef) {
        virtualFocusRef.current.classList.add(css.focused)
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

    render() {
        return (
            <div className={css.player}>
                <video ref={this.playerRef} onEnded={this.onEnded} onCanPlay={this.onCanPlay} onTimeUpdate={this.onTimeUpdate} autoPlay src={this.viewModel.videoUrl} />
                <div ref={this.infoRef} className={css.info}>
                    <div ref={this.topInfoRef} className={css.top_info}>
                        <i onClick={this.onBack} ref={this.backRef} className={css.material_icons}>arrow_back</i>
                        <h1 className={css.title}>{this.viewModel.title}</h1>
                    </div>
                    <div ref={this.bottomInfoRef} className={css.bottom_info}>
                        <i onClick={this.onPlayPause} ref={this.playPauseRef} className={css.material_icons}>pause</i>
                        <progress onClick={this.onMouseSeekProgress} ref={this.progressRef} value={this.state.watched} max={100}></progress>
                        <span>{this.state.remainingTime}</span>
                    </div>
                </div>
            </div>
        )
    }
}