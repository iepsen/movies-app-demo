import { useEffect, useState } from 'react'
import { ON_KEY_DOWN, ON_FOCUS_CHANGE } from './constants'
import { UseFocusInterface } from './interfaces'

const useFocus = ({ id, focus = false, onUp, onDown, onLeft, onRight }: UseFocusInterface): boolean => {
  const [isFocused, setFocus] = useState(focus)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isFocused) return
      switch (event.key) {
        case 'ArrowUp':
          dispatchEvent(onUp)
          break
        case 'ArrowDown':
          dispatchEvent(onDown)
          break
        case 'ArrowLeft':
          dispatchEvent(onLeft)
          break
        case 'ArrowRight':
          dispatchEvent(onRight)
          break
        default:
          break
      }
    }

    const onFocusChange = (event: CustomEvent) => setFocus(id === event.detail.id)

    const dispatchEvent = (nextId?: string): void => {
      if (!nextId) return
      document.dispatchEvent(new CustomEvent(ON_FOCUS_CHANGE, { detail: { id: nextId } }))
    }
    document.addEventListener(ON_KEY_DOWN, onKeyDown)
    document.addEventListener(ON_FOCUS_CHANGE, onFocusChange as EventListener)
    return () => {
      document.removeEventListener(ON_KEY_DOWN, onKeyDown)
      document.removeEventListener(ON_FOCUS_CHANGE, onFocusChange as EventListener)
    }
  })

  return isFocused
}

export { useFocus }
