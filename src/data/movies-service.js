import { MovieEntity } from '../domain/movie-entity'

export class MoviesService {
    constructor() {
        this.serviceUrl = 'https://2qcg0zv57a.execute-api.us-west-2.amazonaws.com/default/fetchVideos'
    }

    async get() {
        return fetch(this.serviceUrl)
            .then(response => response.json())
            .then(response => response.entries)
            .then(movies => movies.map(movie => 
                new MovieEntity(movie).get())
            )
    }

    setStoreProgress(key, value) {
        localStorage.setItem(key, value)
    }

    getStoreProgress(key) {
        return localStorage.getItem(key)
    }

    async getWatchedMovies() {
        return []
    }
}