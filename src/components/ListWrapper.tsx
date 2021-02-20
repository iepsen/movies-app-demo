import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core'

type ListWrapperInterface = {
  children: React.ReactNodeArray
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
  (props: ListWrapperInterface, ref): JSX.Element => {
    const styles = useStyles()
    return (
      <div ref={ref} className={styles.wrapper}>
        <div className={styles.container}>{props.children}</div>
      </div>
    )
  }
)

ListWrapper.displayName = 'ListWrapper'
