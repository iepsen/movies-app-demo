import React from 'react'
import { VideoPlayerComponent } from '../../presentation/components/video-player'

export class MovieRouteComponent extends React.Component {
    render() {
        console.log(this.props)
        return (
            <VideoPlayerComponent data={this.props.location.state.movie} />
        )
    }
}