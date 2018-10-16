/** @module presentation/routes */
import React from 'react'
import { VideoPlayerComponent } from '../../presentation/components/video-player'
import { MovieInteractor } from '../../domain/movie-interactor'

/**
 * MovieRouteComponent
 */
export class MovieRouteComponent extends React.Component {
    /**
     * Initialize the MovieRouteComponent 
     * @param {React.Props} props - The component props
     */
    constructor(props) {
        super(props)
        this.onTimeUpdate = this.onTimeUpdate.bind(this)
        this.onBack = this.onBack.bind(this)
        this.movie = this.props.location.state.movie
        this.interactor = new MovieInteractor()
    }

    /**
     * Dispatched on user returns from the VideoPlayerComponent
     * and store the progress time.
     * @param {string} watched - Seconds watched
     */
    onBack(watched) {
        if (watched) {
            this.interactor.setStoredProgress(this.movie.id, 0)
        }

        this.props.history.goBack()
    }

    /**
     * Dispatched while user watch the video on VideoPlayerComponent
     * and store the progress time.
     * @param {string} watched - Seconds watched
     */
    onTimeUpdate(watched) {
        this.interactor.setStoredProgress(this.movie.id, watched)
    }

    render() {
        return (
            <VideoPlayerComponent onBack={this.onBack} onTimeUpdate={this.onTimeUpdate} data={this.movie} />
        )
    }
}