import React, { useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ListItemViewModel } from '../viewModels/interfaces/ListItemViewModel'

type ListItemProps = {
  index: number
  hasFocus?: boolean
  onFocus: (index: number, details: ListItemViewModel) => void
  data: ListItemViewModel
}

const useStyles = makeStyles(() => ({
  link: {
    transition: 'all .3s ease-in-out',
    border: '1rem solid transparent',
    display: 'inline-block',
    width: '18rem',
    height: '26rem'
  },
  activeLink: {
    borderColor: '#90cea1'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}))

export const ListItem = ({
  index,
  hasFocus = false,
  onFocus,
  data
}: ListItemProps): JSX.Element => {
  const styles = useStyles({ hasFocus })
  useEffect(() => {
    if (hasFocus) {
      onFocus?.(index, data)
    }
  }, [hasFocus])

  const linkStyle = clsx(styles.link, hasFocus && styles.activeLink)

  return (
    <Link className={linkStyle} to={data.link}>
      <img className={styles.image} src={data?.posterImage} alt={data?.title} />
    </Link>
  )
}
