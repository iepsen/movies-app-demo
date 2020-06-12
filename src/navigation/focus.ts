import { useState, useEffect } from 'react'
import { Subject } from 'rxjs'

type UseFocus = {
  hasFocus: boolean
}

const FocusIdDefinedError = (id: string) => `The ${id} is already defined.`

const focusSet = new Set<string>()

const focusManager = new Subject<string>()

const useFocus = (id: string): UseFocus => {
  const [hasFocus, setFocus] = useState(false)

  useEffect(() => {
    focusManager.subscribe({
      next: focus => setFocus(focus === id)
    })
    if (focusSet.has(id)) {
      throw FocusIdDefinedError(id)
    }
    focusSet.add(id)
    return () => {
      focusSet.delete(id)
    }
  }, [])

  return { hasFocus }
}

export { useFocus, focusManager }
