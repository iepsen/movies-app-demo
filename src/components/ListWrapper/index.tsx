import React, { forwardRef } from 'react'
import './ListWrapper.css'

interface ListWrapperInterface {
  children: React.ReactNodeArray
}

const ListWrapper = forwardRef<HTMLDivElement, ListWrapperInterface>((props: ListWrapperInterface, ref): JSX.Element => {
  return (
    <div ref={ref} className="list-wrapper">
      <div className="list-wrapper-container">
        {props.children}
      </div>
    </div>
  )
})
ListWrapper.displayName = 'ListWrapper'

export { ListWrapper }
