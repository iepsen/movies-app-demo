import { MoviesService } from '../data/movies-service'

export class MovieInteractor {
    constructor() {
        this.service = new MoviesService()
    }
    
    get() {
        return this.service.get()
    }

    setStoredProgress(id, seconds) {
        this.service.setStoredProgress(id, seconds)
    }
}