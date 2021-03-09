import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

type BackgroundProps = {
  image?: string
}
const useStyles = makeStyles(() => ({
  background: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.2,
    zIndex: -1
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}))

export const Background = ({ image }: BackgroundProps): JSX.Element => {
  const styles = useStyles()
  return (
    <div className={styles.background}>
      <img className={styles.image} src={image} />
    </div>
  )
}
