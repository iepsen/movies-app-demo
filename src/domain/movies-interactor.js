import { MoviesService } from '../data/movies-service'

/** @module domain */

/**
 * A gateway class to intermediate the communication
 * between the Movies presentation and data layer
 */
export class MoviesInteractor {
    constructor() {
        this.service = new MoviesService()
    }

    /**
     * Get objects
     * @async
     * @returns {Promise} The movie entries.
     */
    get() {
        return this.service.get()
    }
}