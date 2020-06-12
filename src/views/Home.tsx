import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { getTrendingMovies, getTrendingShows } from '../services/trending'
import { MediaModel } from '../models/interfaces/MediaModel'
import { Section } from '../components/Section'
import { ListRow } from '../components/ListRow'
import { Featured } from '../components/Featured'
import { ListWrapper } from '../components/ListWrapper'
import { Background } from '../components/Background'
import { FeaturedItemViewModel } from '../viewModels/interfaces/FeaturedViewModel'

const Home = (): JSX.Element|null => {
  const [featured, setFeatured] = useState<FeaturedItemViewModel>()
  const [movies, setMovies] = useState<MediaModel[]>([])
  const [shows, setShows] = useState<MediaModel[]>([])
  const wrapper = useRef<HTMLDivElement|null>(null)

  const onFocus = (media: FeaturedItemViewModel): void => setFeatured(media)

  const onActive = (id: string): void => {
    if (!wrapper.current) {
      return
    }
    wrapper.current.scrollTop = id === 'trending-shows' ? 432 : 0
  }

  useEffect(() => {
    getTrendingMovies().then(data => setMovies(data))
    getTrendingShows().then(data => setShows(data))
  }, [])

  return (
    <>
      <Background image={featured?.backgroundImage} />
      <Featured data={featured} />
      <ListWrapper ref={wrapper}>
        <Section id="trending-movies" downId="trending-shows" auto>
          <ListRow id="trending-movies" onActive={onActive} onFocus={onFocus} title="Trending Movies" data={movies} />
        </Section>
        <Section id="trending-shows" upId="trending-movies">
          <ListRow id="trending-shows" onActive={onActive} onFocus={onFocus} title="Trending Shows" data={shows} />
        </Section>
      </ListWrapper>
    </>
  )
}

export default Home
