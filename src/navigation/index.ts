import { useState, useEffect } from 'react'
import { Subject } from 'rxjs'

type UseFocus = {
  hasFocus: boolean
}

type UseSection = {
  isActive: boolean
}

const FocusIdDefinedError = (id: string) => `The focus element with "${id}" is already defined.`
const SectionIdDefinedError = (id: string) => `The section element with "${id}" is already defined.`

const focusSet = new Set<string>()
const sectionSet = new Set<string>()

const focusManager = new Subject<string>()
const sectionManager = new Subject<string>()

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

const useSection = (id: string): UseSection => {
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    sectionManager.subscribe({
      next: focus => setActive(focus === id)
    })
    if (sectionSet.has(id)) {
      throw SectionIdDefinedError(id)
    }
    sectionSet.add(id)
    return () => {
      sectionSet.delete(id)
    }
  }, [])

  return { isActive }
}

export { useFocus, useSection, focusManager, sectionManager }