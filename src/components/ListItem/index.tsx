import React from 'react'
import { Link } from 'react-router-dom'
import './ListItem.css'
import { ListItemViewModel } from '../../viewModels/interfaces/ListItemViewModel'

type Props = {
  onFocus: ((details: ListItemViewModel) => void)
  data: ListItemViewModel
}

const ListItem = ({ onFocus, data }: Props): JSX.Element => {
  return (
    <Link onMouseEnter={() => onFocus(data)} className="list-item" to={data.link}>
      <img src={data?.posterImage} alt={data?.title} />
    </Link>
  )
}

export { ListItem }
