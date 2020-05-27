import React from 'react'
import { FeaturedItemViewModel } from '../../viewModels/interfaces/FeaturedViewModel'
import './Featured.css'

type Props = {
  data?: FeaturedItemViewModel
}

const Featured = ({ data }: Props): JSX.Element => {
  return (
    <>
      <div className="featured-container">
        <h2>{data?.title}</h2>
        <p>{data?.overview}</p>
      </div>
    </>
  )
}

export { Featured }
