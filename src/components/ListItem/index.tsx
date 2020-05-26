import React from 'react'
import { ListItemViewModel } from '../../viewModels/interfaces/ListItemViewModel'
import { Link } from 'react-router-dom'

const ListItem = ({ link, title, posterImage }: ListItemViewModel): JSX.Element => {
  return (
    <Link to={link}>
      <img src={posterImage} alt={title} />
    </Link>
  )
}

export { ListItem }
