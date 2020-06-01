import { useEffect, useState } from 'react'
import { ON_KEY_DOWN, ON_NAV_CHANGE } from './constants'
import { UseSectionInterface } from './interfaces'

const useSection = ({ id, active = false, onUp, onDown, onLeft, onRight }: UseSectionInterface): boolean => {
  const [isActive, setActive] = useState(active)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isActive) return
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

    const onNavChange = (event: CustomEvent) => setActive(id === event.detail.id)

    const dispatchEvent = (nextId?: string): void => {
      if (!nextId) return
      document.dispatchEvent(new CustomEvent(ON_NAV_CHANGE, { detail: { id: nextId } }))
    }
    document.addEventListener(ON_KEY_DOWN, onKeyDown)
    document.addEventListener(ON_NAV_CHANGE, onNavChange as EventListener)
    return () => {
      document.removeEventListener(ON_KEY_DOWN, onKeyDown)
      document.removeEventListener(ON_NAV_CHANGE, onNavChange as EventListener)
    }
  })

  return isActive
}

export { useSection }
