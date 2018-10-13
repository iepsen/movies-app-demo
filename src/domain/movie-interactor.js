import { MoviesService } from '../data/movies-service'

export class MovieInteractor {
    constructor() {
        this.service = new MoviesService()
    }
    get() {
        return this.service.get()
    }

    setStoreProgress(id, seconds) {
        this.service.setStoreProgress(id, seconds)
    }
}