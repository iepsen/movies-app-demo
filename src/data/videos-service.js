import { VideoEntity } from '../domain/video-entity'

export class VideosService {
    constructor() {
        this.serviceUrl = 'https://2qcg0zv57a.execute-api.us-west-2.amazonaws.com/default/fetchVideos'
    }

    async get() {
        return fetch(this.serviceUrl)
            .then(response => response.json())
            .then(response => response.entries)
            .then(entries => entries.map(entry => 
                new VideoEntity(entry).get())
            )
    }
}