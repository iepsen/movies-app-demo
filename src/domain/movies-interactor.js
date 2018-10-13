import { MoviesService } from '../data/movies-service'

export class MoviesInteractor {
    constructor() {
        this.service = new MoviesService()
    }

    get() {
        return this.service.get()
    }

    getWatchedMovies() {
        return this.service.getWatchedMovies()
    }
}