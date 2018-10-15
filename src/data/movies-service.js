import { MovieEntity } from '../domain/movie-entity'

export class MoviesService {
    constructor() {
        this.serviceUrl = 'https://2qcg0zv57a.execute-api.us-west-2.amazonaws.com/default/fetchVideos'
        this.entities = []
    }

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

    setStoredProgress(key, value) {
        localStorage.setItem(key, value)
    }

    getStoredProgress(key) {
        return localStorage.getItem(key)
    }

    async getWatchedMovies() {
        return this.entities
    }
}