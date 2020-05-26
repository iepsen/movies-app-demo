import React from 'react'
import { Link } from 'react-router-dom'
import './ListItem.css'

type Props = {
  active?: boolean
  link: string
  title: string
  posterImage: string
}

const ListItem = ({ active = false, link, title, posterImage }: Props): JSX.Element => {
  const className = active ? 'list-item active' : 'list-item'
  return (
    <Link className={className} to={link}>
      <img src={posterImage} alt={title} />
    </Link>
  )
}

export { ListItem }
