import React, { useState, useEffect } from 'react'
import RowList from '../components/RowList'
import { getTrendingMovies, getTrendingShows } from '../services/trending'
import { MediaModel } from '../models/interfaces/MediaModel'
import { Featured } from '../components/Featured'
import { ListWrapper } from '../components/ListWrapper'
import { FeaturedItemViewModel } from '../viewModels/interfaces/FeaturedViewModel'
import { Background } from '../components/Background'
import { Section } from '../navigation/Section'

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
        <Section id="trending-movies" onDown="trending-shows" active>
          {injectedProps => <RowList isActive={injectedProps.isActive} onFocus={onFocus} title="Trending Movies" data={movies} />}
        </Section>
        <Section id="trending-shows" onUp="trending-movies">
          {injectedProps => <RowList isActive={injectedProps.isActive} onFocus={onFocus} title="Trending Shows" data={shows} />}
        </Section>
      </ListWrapper>
    </>
  )
}

export default Home
