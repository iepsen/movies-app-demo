import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ListItem.css'
import { ListItemViewModel } from '../../viewModels/interfaces/ListItemViewModel'

type Props = {
  index: number
  hasFocus: boolean
  onFocus: (index: number, details: ListItemViewModel) => void
  data: ListItemViewModel
}

const ListItem = ({ index, hasFocus, onFocus, data }: Props): JSX.Element => {
  const [className, setClassName] = useState('list-item')
  useEffect(() => {
    if (hasFocus && onFocus) {
      onFocus(index, data)
      setClassName('list-item active')
    } else {
      setClassName('list-item')
    }
  }, [hasFocus])

  return (
    <Link className={className} to={data.link}>
      <img src={data?.posterImage} alt={data?.title} />
    </Link>
  )
}

export { ListItem }
