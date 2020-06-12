import React, { useEffect } from 'react'
import { useFocus, focusManager } from '../navigation'
import { Device, KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT } from '../navigation/device'

type Props = {
  id: string,
  auto?: boolean,
  upId?: string,
  downId?: string,
  leftId?: string,
  rightId?: string,
  onClick: (id: string) => void,
  children: JSX.Element
}

const { subscribe } = Device()

const Focus = ({ id, auto = false, upId, downId, leftId, rightId, onClick, children }: Props): JSX.Element => {
  const { hasFocus } = useFocus(id)
  const enhancedChildren = React.cloneElement(children, {
    ...children.props,
    hasFocus,
    onClick
  })

  const next = (id: string) => {
    return () => focusManager.next(id)
  }

  useEffect(() => {
    if (auto) {
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
    }
  }, [hasFocus])

  return enhancedChildren
}

export { Focus }
