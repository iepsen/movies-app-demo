import React from 'react'
import './Background.css'

type Props = {
  image?: string
}

const Background = ({ image }: Props): JSX.Element => (
  <div className="background">
    <img src={image} />
  </div>
)

export { Background }
