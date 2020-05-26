import React, { useState, useEffect } from 'react'
import RowList from '../components/RowList'
import { getTrendingMovies, getTrendingShows } from '../services/trending'
import { MediaModel } from '../models/interfaces/MediaModel'
import { Featured } from '../components/Featured'
import { ListWrapper } from '../components/ListWrapper'

const Home = (): JSX.Element => {
  const [featured, setFeatured] = useState<MediaModel>()
  const [movies, setMovies] = useState<MediaModel[]>([])
  const [shows, setShows] = useState<MediaModel[]>([])

  const onFocus = (media: MediaModel): void => {
    setFeatured(media)
  }

  useEffect(() => {
    getTrendingMovies().then(data => setMovies(data))
    getTrendingShows().then(data => setShows(data))
  }, [])

  return (
    <>
      <Featured data={featured} />
      <ListWrapper>
        <RowList onFocus={onFocus} title="Trending Movies" data={movies} />
        <RowList onFocus={onFocus} title="Trending Shows" data={shows} />
      </ListWrapper>
    </>
  )
}

export default Home
