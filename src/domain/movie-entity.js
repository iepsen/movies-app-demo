/** @module domain */

/**
 * Movie Entity
 */
export class MovieEntity {
    /**
     * 
     * @param {object} payload - The payload movie
     */
    constructor(payload) {
        this.id = payload.id
        this.title = payload.title
        this.description = payload.description
        this.publishedDate = new Date(payload.publishedDate)
        this.availableDate = new Date(payload.availableDate)
        this.video = this.getVideo(payload.contents)
        this.image = this.getImage(payload.images)
        this.rating = this.getParentalRatings(payload.parentalRatings)
        this.categories = this.getCategories(payload.categories)
        this.progress = 0
    }

    /**
     * Get the instance class
     * @returns {MovieEntity} The MovieEntity instance.
     */
    get() {
        return this
    }

    /**
     * Set the movie progress
     * @param {string} progress - Set the movie progress.
     */
    setProgress(progress) {
        this.progress = progress || '0'
    }

    /**
     * Get the movie link
     * @returns {string} The movie link.
     */
    getLink() {
        return `/movie/${this.id}`
    }

    /**
     * Get the movie rating
     * @param {Array} arr - The rating information.
     * @returns {string} The formatted rating.
     */
    getParentalRatings(arr) {
        if (arr.length === 0) return null
        const parentalRatings = arr[0]
        return parentalRatings.rating.replace('_', '-')
    }

    /**
     * Get the movie categories
     * @param {Array} arr - The categories information.
     * @returns {Array} The categories array.
     */
    getCategories(arr) {
        if (arr.length === 0) return null
        return arr.map(category => category.title)
    }

    /**
     * Get the movie source information
     * @param {Array} arr - The source information.
     * @returns {Object} The movie source object
     * with url and duration.
     */
    getVideo(arr) {
        if (arr.length === 0) return ''
        const video = arr[0]
        return {
            url: video.url,
            duration: this.formatDuration(video.duration)
        }
    }

    /**
     * Converts to a human readable duration time
     * @param {number} duration - The duration in milliseconds
     * @returns {string} The formatted duration
     */
    formatDuration(duration) {
        const date = new Date(duration)
        let formattedDuration = ''
        if (date.getUTCHours() > 0) {
            formattedDuration = `${date.getUTCHours()}h`
        }

        if (date.getUTCMinutes() > 0) {
            formattedDuration += ` ${date.getUTCMinutes()}m`
        }

        return formattedDuration
    }

    /**
     * Get the movie image cover
     * It will fallback to a placeholder image if
     * it not available
     * @param {Array} arr - The image information.
     * @returns {string} The movie cover url.
     */
    getImage(arr) {
        if (arr.length === 0) return null
        const image = arr[0]
        return image.url ? image.url : 'https://placeimg.com/200/500/nature'
    }
}