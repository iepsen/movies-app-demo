/** @module presentation/viewmodel */

/**
 * SelectedMovieViewModel 
 */
export class SelectedMovieViewModel {
    /**
     * Initilize the SelectedMovieViewModel with a movie object
     * @param {MovieEntity} movie - A movie entity object.
     */
    constructor(movie) {
        this.title = movie.title
        this.description = movie.description
        this.year = movie.publishedDate.getFullYear()
        this.rating = movie.rating
        this.categories = movie.categories.join(', ')
    }

    /**
     * Get the SelectedMovieViewModel instance
     * @returns {SelectedMovieViewModel} The SelectedMovieViewModel instance.
     */
    get() {
        return this
    }
}