import { describe, it } from 'mocha'
import showMovieResponse from '../__mocks__/ShowResponse.json'
import { Show } from '../models/Show'
import { expect } from 'chai'

describe('Show Model', () => {
  it('should convert a response data into a Show model', () => {
    const movie = Show(showMovieResponse)
    expect(movie.name).equal('Snowpiercer')
    expect(movie.backgroundImage).equal('https://image.tmdb.org/t/p/w1280/a9dT4YLNkyh4m2DTvD8tkXTiYpR.jpg')
    expect(movie.posterImage).equal('https://image.tmdb.org/t/p/w342/n6UNHZoiYj81abwmG38HbNjflDx.jpg')
    expect(movie.mediaType).equal('show')
  })
})
