import React, { ReactNode } from 'react'
import { MediaModel } from '../../models/interfaces/MediaModel'
import { ListItem } from '../ListItem'
import './RowList.css'

interface Props {
  onFocus: ((details: MediaModel) => void)
  title: string
  data: MediaModel[]
  children?: ReactNode
}

const RowList = ({ onFocus, title, data }: Props): JSX.Element => {
  return (
    <>
      <h1 className="row-list-title">{title}</h1>
      <div className="row-list-container">
        <div style={{ width: data.length * 288 }}>
          {data.map(media => {
            return <ListItem onFocus={onFocus} data={media} key={media.title} />
          })}
        </div>
      </div>
    </>
  )
}

export default RowList
