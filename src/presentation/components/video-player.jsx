import React from 'react'
import { VideoPlayerViewModel } from '../viewmodel/video-player'
import css from '../styles/video-player.scss'

export class VideoPlayerComponent extends React.Component {
    constructor(props) {
        super(props)
        this.onTimeUpdate = this.onTimeUpdate.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onCanPlay = this.onCanPlay.bind(this)
        this.onProgress = this.onProgress.bind(this)
        this.onEnded = this.onEnded.bind(this)
        this.playerRef = React.createRef()
        this.backRef = React.createRef()
        this.playPauseRef = React.createRef()
        this.progressRef = React.createRef()
        this.viewModel = new VideoPlayerViewModel(props.data).get()
        this.duration = 0
        this.state = {
            remainingTime: '00:00:00',
            watched: 0
        }

        window.addEventListener('keydown', this.onKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
    }

    onKeyDown(event) {
        switch(event.keyCode) {
            case 13:
                if (document.activeElement === this.playPauseRef.current) {
                    this.onPlayPause()
                }
                if (document.activeElement === this.backRef.current) {
                    this.onBack()
                }
                break
            case 38:
                this.backRef.current.focus()
                break
            case 40:
                this.playPauseRef.current.focus()
                break
        }
    }

    onProgress(event) {
        const offsetLeft = event.currentTarget.offsetLeft
        const clientX = event.clientX
        const clientWidth = event.currentTarget.clientWidth
        const percentage = ((clientX - offsetLeft) * 100 / clientWidth)

        this.seekTo(percentage)
    }

    onPlayPause() {
        let icon = ''
        if (this.playerRef.current.paused) {
            this.playerRef.current.play()
            icon = 'play_arrow'
        } else {
            this.playerRef.current.pause()
            icon = 'pause_arrow'
        }
        this.playPauseRef.current.textContent = icon
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
        this.duration = this.playerRef.current.duration
        this.setState({
            remainingTime: this.getRemainingTime(0)
        })

        this.playPauseRef.current.focus()
    }

    onTimeUpdate() {
        const elapsedTime = Math.ceil(this.playerRef.current.currentTime)
        this.setState({
            remainingTime: this.getRemainingTime(elapsedTime),
            watched: this.getProgress(elapsedTime)
        })

        if (this.props.onTimeUpdate) {
            this.props.onTimeUpdate(this.state.watched)
        }
    }

    getDuration() {
        return this.playerRef.current.duration
    }

    getProgress(elapsedTime) {
        return elapsedTime * 100 / this.duration
    }

    getRemainingTime(elapsedTime) {
        return new Date((this.duration - elapsedTime) * 1000).toISOString().substr(11, 8)
    }

    seekTo(percentage) {
        const duration = this.getDuration()
        const seconds = duration * percentage / 100
        this.playerRef.current.currentTime = seconds
    }

    render() {
        return (
            <div className={css.player}>
                <video ref={this.playerRef} onEnded={this.onEnded} onCanPlay={this.onCanPlay} onTimeUpdate={this.onTimeUpdate} autoPlay src={this.viewModel.videoUrl} width={'100%'} height={'100%'} />
                <div className={css.controls}>
                    <div className={css.back}>
                        <i tabIndex={0} ref={this.backRef} className={css.material__icons}>arrow_back</i>
                    </div>
                    <div className={css.title}>
                        <h1>{this.viewModel.title}</h1>
                    </div>
                    <div className={css.toggle__play__pause}>
                        <i tabIndex={0} ref={this.playPauseRef} className={css.material__icons}>play_arrow</i>
                    </div>
                    <progress onClick={this.onProgress} ref={this.progressRef} value={this.state.watched} max={100}></progress>
                    <div className={css.time}>
                        <i>{this.state.remainingTime}</i>
                    </div>
                </div>
            </div>
        )
    }
}