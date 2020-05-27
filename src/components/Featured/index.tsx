import React from 'react'
import './Featured.css'
import { FeaturedItemViewModel } from '../../viewModels/interfaces/FeaturedViewModel'

type Props = {
  data?: FeaturedItemViewModel
}

const Featured = ({ data }: Props): JSX.Element => {
  return (
    <>
      <div className="featured-background">
        <img src={data?.backgroundImage} />
      </div>
      <div className="featured-container">
        <h2>{data?.title}</h2>
        <p>{data?.overview}</p>
      </div>
    </>
  )
}

export { Featured }
