import { cloneElement, ReactElement, useEffect } from 'react'
import { useFocusNode } from '../navigation'

type FocusProps = {
  id: string
  autoFocus?: boolean
  leftId?: string
  rightId?: string
  topId?: string
  bottomId?: string
  onSelect?: () => void
  children: ReactElement
}

export const Focus = ({
  id,
  autoFocus = false,
  leftId,
  rightId,
  topId,
  bottomId,
  onSelect,
  children
}: FocusProps): ReactElement => {
  const { hasFocus, addNode, getNode, setCurrentNode } = useFocusNode(id)
  const enhancedChildren = cloneElement(children, {
    ...children?.props,
    hasFocus
  })

  useEffect(() => {
    if (!getNode(id)) addNode(id, leftId, rightId, topId, bottomId, onSelect)
  }, [id, leftId, rightId, topId, bottomId, onSelect, addNode, getNode])

  useEffect(() => {
    if (autoFocus) {
      setCurrentNode(id)
    }
  }, [autoFocus, id, setCurrentNode])

  return enhancedChildren
}
