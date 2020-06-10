import { useEffect, useState } from 'react'
import { ON_FOCUS_CHANGE } from './constants'
import { UseFocusInterface, CallbackEventType } from './interfaces'
import { Device, KEY_UP, KEY_DOWN, KEY_RIGHT, KEY_LEFT, KEY_OK } from './device'

const useFocus = ({ id, focus = false, onUp, onDown, onLeft, onRight, onClick }: UseFocusInterface): boolean => {
  const [isFocused, setFocus] = useState(focus)
  const { subscribe } = Device()

  const onFocusChange = (event: CustomEvent) => setFocus(id === event.detail.id)

  const dispatchEvent = (nextId?: string): CallbackEventType => {
    if (!nextId) return null
    return () => document.dispatchEvent(new CustomEvent(ON_FOCUS_CHANGE, { detail: { id: nextId } }))
  }

  useEffect(() => {
    if (focus) {
      setFocus(true)
    }
    if (onUp && focus) {
      subscribe(KEY_UP, dispatchEvent(onUp))
    }
    if (onDown && focus) {
      subscribe(KEY_DOWN, dispatchEvent(onDown))
    }
    if (onLeft && focus) {
      subscribe(KEY_LEFT, dispatchEvent(onLeft))
    }
    if (onRight && focus) {
      subscribe(KEY_RIGHT, dispatchEvent(onRight))
    }
    if (onClick && focus) {
      subscribe(KEY_OK, onClick)
    }
  }, [focus])

  useEffect(() => {
    document.addEventListener(ON_FOCUS_CHANGE, onFocusChange as EventListener)
    return () => {
      document.removeEventListener(ON_FOCUS_CHANGE, onFocusChange as EventListener)
    }
  }, [])

  return isFocused
}

export { useFocus }
