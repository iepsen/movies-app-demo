/** @module presentation/routes */
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { VideoPlayerComponent } from '../../presentation/components/video-player'
import { MovieInteractor } from '../../domain/movie-interactor'

/**
 * MovieRouteComponent
 */
const MovieRouteComponent = () => {
    const interactor = new MovieInteractor()
    const history = useHistory()
    const location = useLocation()
    const { movie } = location.state
    
    /**
     * Dispatched on user returns from the VideoPlayerComponent
     * and store the progress time.
     * @param {string} watched - Seconds watched
     */
    const onBack = watched => {
        if (watched) {
            interactor.setStoredProgress(movie.id, '0')
        }
        history.goBack()
    }

    /**
     * Dispatched while user watch the video on VideoPlayerComponent
     * and store the progress time.
     * @param {string} watched - Seconds watched
     */
    const onTimeUpdate = watched => {
        interactor.setStoredProgress(movie.id, watched)
    }

    return (
        <VideoPlayerComponent onBack={onBack} onTimeUpdate={onTimeUpdate} data={movie} />
    )
}

export { MovieRouteComponent }