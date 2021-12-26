import { ReactElement, useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { IMediaModel } from '../models/interfaces'
import { ListItemView } from '../viewModels/ListItemView'
import { ListItemViewModel } from '../viewModels/interfaces/ListItemViewModel'
import { focusManager } from '../navigation'
import { ListItem } from './ListItem'
import { Focus } from './Focus'

const LIST_ITEM_WIDTH = 18

type ListRowProps = {
  id: string
  isActive?: boolean
  onFocus: (details: ListItemViewModel) => void
  onActive: (id: string) => void
  title: string
  data: IMediaModel[]
  children?: ReactElement
}

const useStyles = makeStyles(() => ({
  title: {
    fontSize: '2.2rem',
    textTransform: 'uppercase'
  },
  container: {
    scrollBehavior: 'smooth',
    overflow: 'auto',
    scrollbarWidth: 'none'
  },
  wrapper: {
    transition: '200ms ease-in-out'
  }
}))

export const ListRow = ({
  id,
  isActive = false,
  onFocus,
  onActive,
  title,
  data
}: ListRowProps): ReactElement => {
  const styles = useStyles()
  const history = useHistory()
  const row = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  const buildId = (nextId: number): string => `${id}-list-item-${nextId}`

  const onLeft = (nextId: number): string | undefined => {
    if (nextId < 0) {
      return
    }
    return buildId(nextId)
  }

  const onRight = (nextId: number): string | undefined => {
    if (nextId > data.length - 1) {
      return
    }
    return buildId(nextId)
  }

  const onClick = (link: string) => {
    history.push(link)
  }

  const innerFocus = (index: number, details: ListItemViewModel): void => {
    onFocus(details)
    setCurrent(index)
  }

  useEffect(() => {
    if (!row.current) {
      return
    }
    const htmlElement = document.querySelector('html')
    if (!htmlElement) {
      return
    }
    const fontSize = getComputedStyle(htmlElement).getPropertyValue('font-size')
    row.current.scrollLeft = current * (parseFloat(fontSize) * LIST_ITEM_WIDTH)
  }, [current])

  useEffect(() => {
    if (isActive) {
      focusManager.next(buildId(current))
      onActive(id)
    }
  }, [isActive])

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <div ref={row} className={styles.container}>
        <div className={styles.wrapper} style={{ width: `${data.length * LIST_ITEM_WIDTH}rem` }}>
          {data.map((media, index) => {
            const viewModel = ListItemView(media)
            return (
              <Focus
                autoFocus={isActive && index === current}
                id={buildId(index)}
                leftId={onLeft(index - 1)}
                rightId={onRight(index + 1)}
                onClick={() => onClick(viewModel.link)}
                key={media.title}
              >
                <ListItem
                  index={index}
                  onFocus={() => innerFocus(index, viewModel)}
                  data={viewModel}
                />
              </Focus>
            )
          })}
        </div>
      </div>
    </>
  )
}
