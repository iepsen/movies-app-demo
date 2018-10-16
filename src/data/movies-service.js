import { MovieEntity } from '../domain/movie-entity'

/** @module data */
/**
 * Movies Service
 */
export class MoviesService {
    constructor() {
        this.serviceUrl = 'https://2qcg0zv57a.execute-api.us-west-2.amazonaws.com/default/fetchVideos'
    }

    /**
     * Fetch movies and convert to entity objects
     * @async
     * @param {string} url - The service url.
     * @returns {Promise} The movie entries.
     */
    async get() {
        return fetch(this.serviceUrl)
            .then(response => response.json())
            .then(response => response.entries)
            .then(movies => movies.map(movie => {
                let entity = new MovieEntity(movie).get()
                entity.setProgress(this.getStoredProgress(entity.id))
                return entity
            }))
    }

    /**
     * Save the movie progress
     * @param {string} key - The movie key to store.
     * @param {string} value - The seconds watched.
     */
    setStoredProgress(key, value) {
        localStorage.setItem(key, value)
    }

    /**
     * Get the movie progress
     * @param {string} key - The movie key.
     * @returns {string} The seconds watched.
     */
    getStoredProgress(key) {
        return localStorage.getItem(key)
    }
}