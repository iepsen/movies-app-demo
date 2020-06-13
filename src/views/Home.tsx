import React, { useState, useEffect, useRef } from 'react'
import { getPopularMovies, getPopularShows } from '../services/popular'
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
    wrapper.current.scrollTop = id === 'popular-shows' ? 432 : 0
  }

  useEffect(() => {
    getPopularMovies().then(data => setMovies(data))
    getPopularShows().then(data => setShows(data))
  }, [])

  return (
    <>
      <Background image={featured?.backgroundImage} />
      <Featured data={featured} />
      <ListWrapper ref={wrapper}>
        <Section id="popular-movies" downId="popular-shows" auto>
          <ListRow id="popular-movies" onActive={onActive} onFocus={onFocus} title="Popular Movies" data={movies} />
        </Section>
        <Section id="popular-shows" upId="popular-movies">
          <ListRow id="popular-shows" onActive={onActive} onFocus={onFocus} title="Popular Shows" data={shows} />
        </Section>
      </ListWrapper>
    </>
  )
}

export default Home
