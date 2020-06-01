import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { MediaModel } from '../../models/interfaces/MediaModel'
import { ListItem } from '../ListItem'
import './RowList.css'
import { ListItemView } from '../../viewModels/ListItemView'
import { ListItemViewModel } from '../../viewModels/interfaces/ListItemViewModel'
import { Focus } from '../../navigation/Focus'

interface Props {
  isActive: boolean
  onFocus: ((details: ListItemViewModel) => void)
  title: string
  data: MediaModel[]
  children?: ReactNode
}

const RowList = ({ isActive, onFocus, title, data }: Props): JSX.Element => {
  const row = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const buildId = (id: number): string => `list-item-${id}`
  const onLeft = (id: number): string | undefined => {
    if (id < 0) {
      return
    }
    return buildId(id)
  }
  const onRight = (id: number): string |undefined => {
    if (id > data.length - 1) {
      return
    }
    return buildId(id)
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
        <div style={{ width: data.length * 288 }}>
          {data.map((media, index) => {
            const viewModel = ListItemView(media)
            return (
              <Focus index={index} id={buildId(index)} onLeft={onLeft(index - 1)} onRight={onRight(index + 1)} key={media.title} focus={isActive && index === current}>
                {injectedProps =>
                  <ListItem index={index} hasFocus={isActive && injectedProps.isFocused} onFocus={innerFocus} data={viewModel} />
                }
              </Focus>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default RowList
