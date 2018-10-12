import React from 'react'
import { VideoPlayerComponent } from '../../presentation/components/video-player'

export class MovieRouteComponent extends React.Component {
    render() {
        return (
            <VideoPlayerComponent data={this.props.location.state.movie} />
        )
    }
}