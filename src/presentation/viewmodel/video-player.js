/** @module presentation/viewmodel */

/** VideoPlayerViewModel */
export class VideoPlayerViewModel {
    /**
     * Initilize the VideoPlayerViewModel with a movie object
     * @constructor
     * @param {MovieEntity} movie - A movie entity object.
     * @memberof module:VideoPlayerViewModel#
     */
    constructor(movie) {
        this.title = movie.title
        this.videoUrl = movie.video.url
        this.videoDuration = movie.video.duration
        this.progress = movie.progress
    }

    /**
     * @summary
     * Get the VideoPlayerViewModel instance
     * @returns {VideoPlayerViewModel} The VideoPlayerViewModel instance.
     */
    get() {
        return this
    }
}