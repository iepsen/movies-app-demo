import { MoviesService } from '../data/movies-service'

/** @module domain */

/**
 * A gateway class to intermediate the communication
 * between the Movie Item presentation and data layer
 */
export class MovieInteractor {
    /**
     * Initialize the Movies Service
     */
    constructor() {
        this.service = new MoviesService()
    }

    /**
     * Save the movie progress
     * @param {string} id - The movie id to store.
     * @param {string} seconds - The seconds watched.
     */
    setStoredProgress(id, seconds) {
        this.service.setStoredProgress(id, seconds)
    }
}