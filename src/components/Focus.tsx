import { cloneElement, useEffect } from 'react'
import { useFocus, focusManager } from '../navigation'
import { Device, KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_OK } from '../navigation/device'

type FocusProps = {
  id: string
  autoFocus?: boolean
  upId?: string
  downId?: string
  leftId?: string
  rightId?: string
  onClick?: () => void
  children: JSX.Element
}

const { subscribe } = Device()

export const Focus = ({
  id,
  autoFocus = false,
  upId,
  downId,
  leftId,
  rightId,
  onClick,
  children
}: FocusProps): JSX.Element => {
  const { hasFocus } = useFocus(id)
  const enhancedChildren = cloneElement(children, {
    ...children.props,
    hasFocus
  })

  const next = (id: string) => {
    return () => focusManager.next(id)
  }

  useEffect(() => {
    if (autoFocus) {
      focusManager.next(id)
    }
  }, [])

  useEffect(() => {
    if (hasFocus) {
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
      if (onClick) {
        subscribe(KEY_OK, onClick)
      }
    }
  }, [hasFocus])

  return enhancedChildren
}
