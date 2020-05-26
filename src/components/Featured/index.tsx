import React from 'react'
import './Featured.css'
import { MediaModel } from '../../models/interfaces/MediaModel'

type Props = {
  data?: MediaModel
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
