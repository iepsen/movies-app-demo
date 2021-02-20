import { describe, it } from 'mocha'
import { MediaModel } from '../models/MediaModel'
import { expect } from 'chai'
import mockMovieResponse from '../__mocks__/PopularMovieResponse.json'
import showMovieResponse from '../__mocks__/PopularShowResponse.json'

describe('Media Model', () => {
  it('should convert a popular movie response data into a Media model', () => {
    const media = MediaModel(mockMovieResponse, 'movie')
    expect(media.title).equal('The Lovebirds')
    expect(media.backgroundImage).equal(
      'https://image.tmdb.org/t/p/w1280/1EGFjibWzsN2GNNeOSQBYhQ9pK5.jpg'
    )
    expect(media.posterImage).equal(
      'https://image.tmdb.org/t/p/w342/5jdLnvALCpK1NkeQU1z4YvOe2dZ.jpg'
    )
    expect(media.type).equal('movie')
  })
  it('should convert a popular show response data into a Media model', () => {
    const media = MediaModel(showMovieResponse, 'show')
    expect(media.title).equal('Snowpiercer')
    expect(media.backgroundImage).equal(
      'https://image.tmdb.org/t/p/w1280/a9dT4YLNkyh4m2DTvD8tkXTiYpR.jpg'
    )
    expect(media.posterImage).equal(
      'https://image.tmdb.org/t/p/w342/n6UNHZoiYj81abwmG38HbNjflDx.jpg'
    )
    expect(media.type).equal('show')
  })
})
