export class MovieEntity {
    constructor(payload) {
        this.id = payload.id
        this.title = payload.title
        this.description = payload.description
        this.publishedDate = new Date(payload.publishedDate)
        this.availableDate = new Date(payload.availableDate)
        this.video = this.getVideo(payload.contents)
        this.image = this.getImage(payload.images)
        this.progress = 0
    }

    get() {
        return this
    }

    setProgress(progress) {
        this.progress = progress || 0
    }

    getLink() {
        return `/movie/${this.id}`
    }

    getVideo(arr) {
        if (arr.length === 0) return ''
        const video = arr[0]
        return {
            url: video.url,
            duration: video.duration
        }
    }

    getImage(arr) {
        if (arr.length === 0) return null
        const image = arr[0]
        return {
            url: image.url ? image.url : 'https://placeimg.com/200/500/nature',
            width: image.width,
            height: image.height
        }
    }
}