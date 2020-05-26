import React, { ReactNode } from 'react'
import './ListWrapper.css'

type Props = {
  children?: ReactNode
}

const ListWrapper = ({ children }: Props): JSX.Element => {
  return (
    <div className="list-wrapper">
      <div className="list-wrapper-container">
        {children}
      </div>
    </div>
  )
}

export { ListWrapper }
