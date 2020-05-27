import React, { useState, useEffect } from 'react'
import RowList from '../components/RowList'
import { getTrendingMovies, getTrendingShows } from '../services/trending'
import { MediaModel } from '../models/interfaces/MediaModel'
import { Featured } from '../components/Featured'
import { ListWrapper } from '../components/ListWrapper'
import { FeaturedItemViewModel } from '../viewModels/interfaces/FeaturedViewModel'
import { Background } from '../components/Background'

const Home = (): JSX.Element|null => {
  const [featured, setFeatured] = useState<FeaturedItemViewModel>()
  const [movies, setMovies] = useState<MediaModel[]>([])
  const [shows, setShows] = useState<MediaModel[]>([])

  const onFocus = (media: FeaturedItemViewModel): void => {
    setFeatured(media)
  }

  useEffect(() => {
    getTrendingMovies().then(data => setMovies(data))
    getTrendingShows().then(data => setShows(data))
  }, [])

  return (
    <>
      <Background image={featured?.backgroundImage} />
      <Featured data={featured} />
      <ListWrapper>
        <RowList onFocus={onFocus} title="Trending Movies" data={movies} />
        <RowList onFocus={onFocus} title="Trending Shows" data={shows} />
      </ListWrapper>
    </>
  )
}

export default Home
