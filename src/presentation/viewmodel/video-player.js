/** @module presentation/viewmodel */

/** VideoPlayerViewModel */
export class VideoPlayerViewModel {
    /**
     * Initilize the VideoPlayerViewModel with a movie object
     * @param {MovieEntity} movie - A movie entity object.
     */
    constructor(movie) {
        this.title = movie.title
        this.videoUrl = movie.video.url
        this.videoDuration = movie.video.duration
        this.progress = movie.progress
    }

    /**
     * Get the VideoPlayerViewModel instance
     * @returns {VideoPlayerViewModel} The VideoPlayerViewModel instance.
     */
    get() {
        return this
    }
}