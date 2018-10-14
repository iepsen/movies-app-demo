export class SelectedMovieViewModel {
    constructor(movie) {
        this.title = movie.title
        this.description = movie.description
        this.year = movie.publishedDate.getFullYear()
        this.rating = movie.rating
        this.categories = movie.categories.join(', ')
    }

    get() {
        return this
    }
}