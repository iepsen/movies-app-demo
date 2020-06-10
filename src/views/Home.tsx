import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { getTrendingMovies, getTrendingShows } from '../services/trending'
import { MediaModel } from '../models/interfaces/MediaModel'
import { Section } from '../navigation/Section'
import { RowList } from '../components/RowList'
import { Featured } from '../components/Featured'
import { ListWrapper } from '../components/ListWrapper'
import { Background } from '../components/Background'
import { FeaturedItemViewModel } from '../viewModels/interfaces/FeaturedViewModel'

const Home = (): JSX.Element|null => {
  const [featured, setFeatured] = useState<FeaturedItemViewModel>()
  const [current, setCurrent] = useState(0)
  const [movies, setMovies] = useState<MediaModel[]>([])
  const [shows, setShows] = useState<MediaModel[]>([])
  const history = useHistory()
  const wrapper = useRef<HTMLDivElement|null>(null)

  const onFocus = (media: FeaturedItemViewModel): void => setFeatured(media)

  const onClick = (): void => {
    if (featured?.link) {
      history.push(featured.link)
    }
  }

  useEffect(() => {
    getTrendingMovies().then(data => setMovies(data))
    getTrendingShows().then(data => setShows(data))
  }, [])

  const onActive = (index: number): void => {
    if (!wrapper.current) {
      return
    }
    setCurrent(index)
    wrapper.current.scrollTop = index * 432
  }

  return (
    <>
      <Background image={featured?.backgroundImage} />
      <Featured data={featured} />
      <ListWrapper ref={wrapper}>
        <Section index={0} id="trending-movies" onDown="trending-shows" onActive={onActive} active={current === 0}>
          {injectedProps => <RowList onClick={onClick} id={injectedProps.id} isActive={injectedProps.isActive} onFocus={onFocus} title="Trending Movies" data={movies} />}
        </Section>
        <Section index={1} id="trending-shows" onUp="trending-movies" onActive={onActive} active={current === 1}>
          {injectedProps => <RowList onClick={onClick} id={injectedProps.id} isActive={injectedProps.isActive} onFocus={onFocus} title="Trending Shows" data={shows} />}
        </Section>
      </ListWrapper>
    </>
  )
}

export default Home
