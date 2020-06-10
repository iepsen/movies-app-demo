import { useEffect, useState } from 'react'
import { ON_SECTION_CHANGE } from './constants'
import { UseSectionInterface, CallbackEventType } from './interfaces'
import { Device, KEY_UP, KEY_DOWN, KEY_RIGHT, KEY_LEFT } from './device'

const useSection = ({ id, active = false, onUp, onDown, onLeft, onRight }: UseSectionInterface): boolean => {
  const [isActive, setActive] = useState(active)
  const { subscribe } = Device()

  useEffect(() => {
    const onNavChange = (event: CustomEvent) => setActive(id === event.detail.id)
    const dispatchEvent = (nextId?: string): CallbackEventType => {
      if (!nextId) return null
      return () => document.dispatchEvent(new CustomEvent(ON_SECTION_CHANGE, { detail: { id: nextId } }))
    }
    if (onUp && active) {
      subscribe(KEY_UP, dispatchEvent(onUp))
    }
    if (onDown && active) {
      subscribe(KEY_DOWN, dispatchEvent(onDown))
    }
    if (onLeft && active) {
      subscribe(KEY_LEFT, dispatchEvent(onLeft))
    }
    if (onRight && active) {
      subscribe(KEY_RIGHT, dispatchEvent(onRight))
    }
    document.addEventListener(ON_SECTION_CHANGE, onNavChange as EventListener)
    return () => {
      document.removeEventListener(ON_SECTION_CHANGE, onNavChange as EventListener)
    }
  }, [active])

  return isActive
}

export { useSection }
