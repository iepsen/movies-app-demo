import React, { useEffect } from 'react'
import { useSection, sectionManager } from '../navigation'
import { Device, KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT } from '../navigation/device'

type SectionProps = {
  id: string
  autoFocus?: boolean
  upId?: string
  downId?: string
  leftId?: string
  rightId?: string
  children: JSX.Element
}

const { subscribe } = Device()

export const Section = ({
  id,
  autoFocus = false,
  upId,
  downId,
  leftId,
  rightId,
  children
}: SectionProps): JSX.Element => {
  const { isActive } = useSection(id)
  const enhancedChildren = React.cloneElement(children, {
    ...children.props,
    isActive
  })

  const next = (id: string) => {
    return () => sectionManager.next(id)
  }

  useEffect(() => {
    if (autoFocus) {
      sectionManager.next(id)
    }
  }, [])

  useEffect(() => {
    if (sectionManager) {
      if (upId) {
        subscribe(KEY_UP, next(upId))
      }
      if (downId) {
        subscribe(KEY_DOWN, next(downId))
      }
      if (leftId) {
        subscribe(KEY_LEFT, next(leftId))
      }
      if (rightId) {
        subscribe(KEY_RIGHT, next(rightId))
      }
    }
  }, [sectionManager])

  return enhancedChildren
}
