import React from 'react'
import { PlayerViewModel } from '../viewmodel/player'
import css from '../styles/video-player.scss'

export class VideoPlayerComponent extends React.Component {
    constructor(props) {
        super(props)
        this.viewModel = new PlayerViewModel(props.data).get()
    }

    render() {
        return (
            <div className={css.player}>
                <video autoPlay src={this.viewModel.videoUrl} width={'100%'} height={'100%'} />
            </div>
        )
    }
}