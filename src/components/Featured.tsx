import { FeaturedItemViewModel } from '../viewModels/interfaces/FeaturedViewModel'
import { makeStyles } from '@material-ui/core'
import { ReactElement } from 'react'

type FeaturedProps = {
  data?: FeaturedItemViewModel
}

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '30%'
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '4.6rem'
  },
  overview: {
    width: '70%',
    height: '44%',
    overflow: 'hidden',
    fontSize: '1.8rem',
    lineHeight: '2.4rem'
  }
}))

export const Featured = ({ data }: FeaturedProps): ReactElement => {
  const styles = useStyles()
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>{data?.title}</h2>
        <p className={styles.overview}>{data?.overview}</p>
      </div>
    </>
  )
}
