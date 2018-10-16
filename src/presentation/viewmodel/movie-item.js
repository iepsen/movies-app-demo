export class MovieItemViewModel {
    constructor(movie) {
        this.title = movie.title
        this.imageUrl = movie.image
        this.movieLink = this.getLink(movie)
    }

    getLink(movie) {
        return {
            pathname: movie.getLink(),
            state: { movie: movie }
        }
    }

    get() {
        return this
    }
}