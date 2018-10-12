export class SelectedMovieViewModel {
    constructor(movie) {
        this.title = movie.title
        this.description = movie.description
    }

    get() {
        return this
    }
}