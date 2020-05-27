import { describe, it } from 'mocha'
import { Media } from '../models/Media'
import { expect } from 'chai'
import mockMovieResponse from '../__mocks__/TrendingMovieResponse.json'
import showMovieResponse from '../__mocks__/TrendingShowResponse.json'

describe('Media Model', () => {
  it('should convert a trending movie response data into a Media model', () => {
    const media = Media(mockMovieResponse)
    expect(media.title).equal('The Lovebirds')
    expect(media.backgroundImage).equal('https://image.tmdb.org/t/p/w1280/1EGFjibWzsN2GNNeOSQBYhQ9pK5.jpg')
    expect(media.posterImage).equal('https://image.tmdb.org/t/p/w342/5jdLnvALCpK1NkeQU1z4YvOe2dZ.jpg')
    expect(media.type).equal('movie')
  })
  it('should convert a trending show response data into a Media model', () => {
    const media = Media(showMovieResponse)
    expect(media.title).equal('Snowpiercer')
    expect(media.backgroundImage).equal('https://image.tmdb.org/t/p/w1280/a9dT4YLNkyh4m2DTvD8tkXTiYpR.jpg')
    expect(media.posterImage).equal('https://image.tmdb.org/t/p/w342/n6UNHZoiYj81abwmG38HbNjflDx.jpg')
    expect(media.type).equal('show')
  })
})
