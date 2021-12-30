import { cloneElement, ReactElement, useEffect } from 'react'
import { useFocusNode } from '../navigation'

type FocusProps = {
  id: string
  autoFocus?: boolean
  leftId?: string
  rightId?: string
  topId?: string
  bottomId?: string
  onClick?: () => void
  children: ReactElement
}

export const Focus = ({
  id,
  autoFocus = false,
  leftId,
  rightId,
  topId,
  bottomId,
  children
}: FocusProps): ReactElement => {
  const { hasFocus, addNode, setCurrentNode } = useFocusNode(id)
  const enhancedChildren = cloneElement(children, {
    ...children?.props,
    hasFocus
  })

  useEffect(() => {
    addNode(id, leftId, rightId, topId, bottomId)
  }, [id, leftId, rightId, topId, bottomId, addNode])

  useEffect(() => {
    if (autoFocus) {
      setCurrentNode(id)
    }
  }, [autoFocus, id, setCurrentNode])

  return enhancedChildren
}
