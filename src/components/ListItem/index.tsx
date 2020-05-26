import React from 'react'
import { Link } from 'react-router-dom'
import './ListItem.css'
import { MediaModel } from '../../models/interfaces/MediaModel'

type Props = {
  onFocus: ((details: MediaModel) => void)
  data: MediaModel
}

const ListItem = ({ onFocus, data }: Props): JSX.Element => {
  return (
    <Link onMouseEnter={() => onFocus(data)} className="list-item" to={`/details/${data?.id}`}>
      <img src={data?.posterImage} alt={data?.title} />
    </Link>
  )
}

export { ListItem }
