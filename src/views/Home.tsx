import { useState, useEffect, useRef, ReactElement, useCallback } from 'react'
import {
  getDiscoverMovies,
  getDiscoverShows,
  getPopularMovies,
  getPopularShows
} from '../services'
import { IMediaModel } from '../models/interfaces'
import { Section } from '../components/Section'
import { ListRow } from '../components/ListRow'
import { Featured } from '../components/Featured'
import { ListWrapper } from '../components/ListWrapper'
import { Background } from '../components/Background'
import { FeaturedItemViewModel } from '../viewModels/interfaces/FeaturedViewModel'

const Home = (): ReactElement => {
  const [featured, setFeatured] = useState<FeaturedItemViewModel>()
  const [movies, setMovies] = useState<IMediaModel[]>([])
  const [shows, setShows] = useState<IMediaModel[]>([])
  const [discoverMovies, setDiscoverMovies] = useState<IMediaModel[]>([])
  const [discoverShows, setDiscoverShows] = useState<IMediaModel[]>([])
  const wrapper = useRef<HTMLDivElement | null>(null)

  const onFocus = useCallback(
    (media: FeaturedItemViewModel): void => {
      if (featured?.backgroundImage !== media.backgroundImage) {
        setFeatured(media)
      }
    },
    [featured?.backgroundImage]
  )

  const onActive = useCallback((id: string): void => {
    let scrollTop = 0

    switch (id) {
      case 'popular-movies':
        scrollTop = 0
        break
      case 'popular-shows':
        scrollTop = 390
        break
      case 'discover-movies':
        scrollTop = 870
        break
      case 'discover-shows':
        scrollTop = 1232
        break
      default:
        scrollTop = 0
        break
    }
    if (wrapper.current) {
      wrapper.current.scrollTop = scrollTop
    }
  }, [])

  useEffect(() => {
    getPopularMovies().then(setMovies)
    getPopularShows().then(setShows)
    getDiscoverMovies().then(setDiscoverMovies)
    getDiscoverShows().then(setDiscoverShows)
  }, [])

  return (
    <>
      <Background image={featured?.backgroundImage} />
      <Featured data={featured} />
      <ListWrapper ref={wrapper}>
        <Section id="popular-movies" bottomId="popular-shows" active>
          <ListRow
            id="popular-movies"
            onActive={onActive}
            onFocus={onFocus}
            title="Popular Movies"
            data={movies}
          />
        </Section>
        <Section
          id="popular-shows"
          topId="popular-movies"
          bottomId="discover-movies"
        >
          <ListRow
            id="popular-shows"
            onActive={onActive}
            onFocus={onFocus}
            title="Popular Shows"
            data={shows}
          />
        </Section>
        <Section
          id="discover-movies"
          topId="popular-shows"
          bottomId="discover-shows"
        >
          <ListRow
            id="discover-movies"
            onActive={onActive}
            onFocus={onFocus}
            title="Discover Movies"
            data={discoverMovies}
          />
        </Section>
        <Section id="discover-shows" topId="discover-movies">
          <ListRow
            id="discover-shows"
            onActive={onActive}
            onFocus={onFocus}
            title="Discover Shows"
            data={discoverShows}
          />
        </Section>
      </ListWrapper>
    </>
  )
}

export { Home }
