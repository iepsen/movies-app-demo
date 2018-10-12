import React from 'react'
import { VideoPlayerViewModel } from '../viewmodel/video-player'
import css from '../styles/video-player.scss'

export class VideoPlayerComponent extends React.Component {
    constructor(props) {
        super(props)
        this.viewModel = new VideoPlayerViewModel(props.data).get()
    }

    render() {
        return (
            <div className={css.player}>
                <video autoPlay src={this.viewModel.videoUrl} width={'100%'} height={'100%'} />
                <div className={css.controls}>
                    <div className={css.back}>
                        <i className={css.material__icons}>arrow_back</i>
                    </div>
                    <div className={css.title}>
                        <h1>{this.viewModel.title}</h1>
                    </div>
                    <div className={css.toggle__play__pause}>
                        <i className={css.material__icons}>play_arrow</i>
                    </div>
                    <progress value={0} max={100}></progress>
                    <div className={css.time}>
                        <i>00:00</i>
                    </div>
                </div>
            </div>
        )
    }
}