import { forwardRef, ReactElement } from 'react'
import { makeStyles } from '@material-ui/core'

type ListWrapperInterface = {
  children: ReactElement[]
}

const useStyles = makeStyles(() => ({
  wrapper: {
    scrollBehavior: 'smooth',
    overflow: 'auto',
    height: '70%'
  },
  container: {
    height: '52rem',
    paddingTop: '1%'
  }
}))

export const ListWrapper = forwardRef<HTMLDivElement, ListWrapperInterface>(
  (props: ListWrapperInterface, ref): ReactElement => {
    const styles = useStyles()
    return (
      <div ref={ref} className={styles.wrapper}>
        <div className={styles.container}>{props.children}</div>
      </div>
    )
  }
)

ListWrapper.displayName = 'ListWrapper'
