import { describe, it } from 'mocha'
import mockMovieResponse from '../__mocks__/MovieResponse.json'
import { Movie } from '../models/Movie'
import { expect } from 'chai'

describe('Movie Model', () => {
  it('should convert a response data into a Movie model', () => {
    const movie = Movie(mockMovieResponse)
    expect(movie.title).equal('The Lovebirds')
    expect(movie.backgroundImage).equal('https://image.tmdb.org/t/p/w1280/1EGFjibWzsN2GNNeOSQBYhQ9pK5.jpg')
    expect(movie.posterImage).equal('https://image.tmdb.org/t/p/w342/5jdLnvALCpK1NkeQU1z4YvOe2dZ.jpg')
    expect(movie.mediaType).equal('movie')
  })
})
