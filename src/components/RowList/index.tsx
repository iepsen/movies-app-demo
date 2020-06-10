import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { MediaModel } from '../../models/interfaces/MediaModel'
import { ListItem } from '../ListItem'
import './RowList.css'
import { ListItemView } from '../../viewModels/ListItemView'
import { ListItemViewModel } from '../../viewModels/interfaces/ListItemViewModel'
import { Focus } from '../../navigation/Focus'

interface Props {
  id: string
  isActive: boolean
  onFocus: ((details: ListItemViewModel) => void)
  onClick: () => void
  title: string
  data: MediaModel[]
  children?: ReactNode
}

const RowList = ({ id, isActive, onFocus, onClick, title, data }: Props): JSX.Element => {
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
  return (
    <>
      <h1 className="row-list-title">{title}</h1>
      <div ref={row} className="row-list-container">
        <div className="row-list-wrapper" style={{ width: data.length * 288 }}>
          {data.map((media, index) => {
            const viewModel = ListItemView(media)
            return (
              <Focus onClick={onClick} id={buildId(index)} onLeft={onLeft(index - 1)} onRight={onRight(index + 1)} key={media.title} focus={isActive && index === current}>
                {injectedProps => <ListItem index={index} hasFocus={isActive && injectedProps.isFocused} onFocus={() => innerFocus(index, viewModel)} data={viewModel} />}
              </Focus>
            )
          })}
        </div>
      </div>
    </>
  )
}

export { RowList }
