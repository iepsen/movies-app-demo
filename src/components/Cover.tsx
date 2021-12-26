import { makeStyles } from '@material-ui/core'
import { ReactElement } from 'react'

type CoverProps = {
  image?: string
}

const useStyles = makeStyles(() => ({
  cover: {
    width: '30%',
    height: '45rem'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}))

export const Cover = ({ image }: CoverProps): ReactElement => {
  const styles = useStyles()
  return (
    <div className={styles.cover}>
      <img className={styles.image} src={image} />
    </div>
  )
}
