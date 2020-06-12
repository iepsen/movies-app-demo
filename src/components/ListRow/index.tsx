import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { MediaModel } from '../../models/interfaces/MediaModel'
import { ListItem } from '../ListItem'
import { ListItemView } from '../../viewModels/ListItemView'
import { ListItemViewModel } from '../../viewModels/interfaces/ListItemViewModel'
import { focusManager } from '../../navigation'
import { Focus } from '../Focus'
import './ListRow.css'

interface Props {
  id: string
  isActive?: boolean
  onFocus: ((details: ListItemViewModel) => void)
  onActive: (id: string) => void
  title: string
  data: MediaModel[]
  children?: ReactNode
}

const ListRow = ({ id, isActive = false, onFocus, onActive, title, data }: Props): JSX.Element => {
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

  const onRight = (nextId: number): string |undefined => {
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
    row.current.scrollLeft = current * 288
  }, [current])

  useEffect(() => {
    if (isActive) {
      focusManager.next(buildId(current))
      onActive(id)
    }
  }, [isActive])

  return (
    <>
      <h1 className="row-list-title">{title}</h1>
      <div ref={row} className="row-list-container">
        <div className="row-list-wrapper" style={{ width: data.length * 288 }}>
          {data.map((media, index) => {
            const viewModel = ListItemView(media)
            return (
              <Focus auto={isActive && index === current} id={buildId(index)} leftId={onLeft(index - 1)} rightId={onRight(index + 1)} onClick={() => onClick(viewModel.link)} key={media.title}>
                <ListItem index={index} onFocus={() => innerFocus(index, viewModel)} data={viewModel} />
              </Focus>
            )
          })}
        </div>
      </div>
    </>
  )
}

export { ListRow }
