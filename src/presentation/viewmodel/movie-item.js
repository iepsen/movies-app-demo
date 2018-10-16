/** @module presentation/viewmodel */

/**
 * MovieItemViewModel 
 */
export class MovieItemViewModel {
    /**
     * Initilize the MovieItemViewModel with a movie object
     * @param {MovieEntity} movie - A movie entity object.
     */
    constructor(movie) {
        this.title = movie.title
        this.imageUrl = movie.image
        this.movieLink = this.getLink(movie)
    }

    /**
     * Generates a link object with movie state
     * @param {MovieEntity} movie - A movie entity object.
     * @returns {Object} The link object with movie state.
     */
    getLink(movie) {
        return {
            pathname: movie.getLink(),
            state: { movie }
        }
    }

    /**
     * Get the MovieItemViewModel instance
     * @returns {MovieItemViewModel} The MovieItemViewModel instance.
     */
    get() {
        return this
    }
}