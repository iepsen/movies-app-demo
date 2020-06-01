import React, { ReactNode } from 'react'
import { MediaModel } from '../../models/interfaces/MediaModel'
import { ListItem } from '../ListItem'
import './RowList.css'
import { ListItemView } from '../../viewModels/ListItemView'
import { ListItemViewModel } from '../../viewModels/interfaces/ListItemViewModel'

interface Props {
  isActive: boolean
  onFocus: ((details: ListItemViewModel) => void)
  title: string
  data: MediaModel[]
  children?: ReactNode
}

const RowList = ({ isActive, onFocus, title, data }: Props): JSX.Element => {
  return (
    <>
      <h1 className="row-list-title">{title}</h1>
      <div className="row-list-container">
        <div style={{ width: data.length * 288 }}>
          {data.map(media => {
            const viewModel = ListItemView(media)
            return <ListItem onFocus={onFocus} data={viewModel} key={media.title} />
          })}
        </div>
      </div>
    </>
  )
}

export default RowList
