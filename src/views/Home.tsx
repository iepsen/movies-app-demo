import React, { useState, useEffect, useRef } from 'react'
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
  const wrapper = useRef<HTMLDivElement|null>(null)

  const onFocus = (media: FeaturedItemViewModel): void => {
    setFeatured(media)
  }

  useEffect(() => {
    getTrendingMovies().then(data => setMovies(data))
    getTrendingShows().then(data => setShows(data))
  }, [])

  const onActive = (index: number): void => {
    if (!wrapper.current) {
      return
    }
    wrapper.current.scrollTop = index * 432
    // wrapper.current.style = { transform: `translate3d(${index * 432})` }
  }

  return (
    <>
      <Background image={featured?.backgroundImage} />
      <Featured data={featured} />
      <ListWrapper ref={wrapper}>
        <Section index={0} id="trending-movies" onDown="trending-shows" onActive={onActive} active>
          {injectedProps => <RowList isActive={injectedProps.isActive} onFocus={onFocus} title="Trending Movies" data={movies} />}
        </Section>
        <Section index={1} id="trending-shows" onUp="trending-movies" onActive={onActive}>
          {injectedProps => <RowList isActive={injectedProps.isActive} onFocus={onFocus} title="Trending Shows" data={shows} />}
        </Section>
      </ListWrapper>
    </>
  )
}

export default Home
