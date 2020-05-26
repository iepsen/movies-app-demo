import React, { ReactNode } from 'react'
import { MediaModel } from '../../models/interfaces/MediaModel'
import { ListItem } from '../ListItem'
import { ListItemView } from '../../viewModels/ListItemView'
import './RowList.css'

interface Props {
  title: string
  data: MediaModel[]
  children?: ReactNode
}

const RowList = ({ title, data }: Props): JSX.Element => {
  return (
    <div>
      <h1 className="title">{title}</h1>
      {data.map(media => {
        const viewModel = ListItemView(media)
        return <ListItem key={viewModel.title} link={viewModel.link} title={viewModel.title} posterImage={viewModel.posterImage} />
      })}
    </div>
  )
}

export default RowList
