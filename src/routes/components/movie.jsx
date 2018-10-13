import React from 'react'
import { VideoPlayerComponent } from '../../presentation/components/video-player'
import { MovieInteractor } from '../../domain/movie-interactor'

export class MovieRouteComponent extends React.Component {
    constructor(props) {
        super(props)
        this.onTimeUpdate = this.onTimeUpdate.bind(this)
        this.onBack = this.onBack.bind(this)
        this.movie = this.props.location.state.movie
        this.interactor = new MovieInteractor()
    }

    onBack() {
        this.props.history.goBack()
    }

    onTimeUpdate(watched) {
        this.interactor.setStoreProgress(this.movie.id, watched)
    }

    render() {
        return (
            <VideoPlayerComponent onBack={this.onBack} onTimeUpdate={this.onTimeUpdate} data={this.movie} />
        )
    }
}