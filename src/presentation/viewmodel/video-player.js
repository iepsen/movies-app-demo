export class VideoPlayerViewModel {
    constructor(movie) {
        this.title = movie.title
        this.videoUrl = movie.video.url
        this.videoDuration = movie.video.duration
        this.progress = movie.progress
    }

    get() {
        return this
    }
}