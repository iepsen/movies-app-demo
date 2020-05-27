import React from 'react'
import './Cover.css'

type Props = {
  image?: string
}

const Cover = ({ image }: Props): JSX.Element => (
  <div className="cover">
    <img src={image} />
  </div>
)

export { Cover }
