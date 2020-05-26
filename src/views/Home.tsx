import React, { useState, useEffect } from 'react'
import RowList from '../components/RowList'
import { getTrendingMovies } from '../services/trending'
import { MediaModel } from '../models/interfaces/MediaModel'

const Home = (): JSX.Element => {
  const [movies, setMovies] = useState<MediaModel[]>([])
  useEffect(() => {
    getTrendingMovies().then(data => setMovies(data))
  }, [])
  return (
    <div>
      <RowList title="Trending Movies" data={movies} />
    </div>
  )
}

export default Home
