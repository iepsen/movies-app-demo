import { cloneElement, ReactElement, useEffect } from 'react'
import { useFocusArea } from '../navigation'

type SectionProps = {
  id: string
  active?: boolean
  leftId?: string
  rightId?: string
  topId?: string
  bottomId?: string
  children: ReactElement
}

export const Section = ({
  id,
  active = false,
  leftId,
  rightId,
  topId,
  bottomId,
  children
}: SectionProps): ReactElement => {
  const { isActive, addNode, setCurrentNode, releaseCurrentNode } =
    useFocusArea(id)
  const enhancedChildren = cloneElement(children, {
    ...children.props,
    isActive
  })

  useEffect(() => {
    addNode(id, leftId, rightId, topId, bottomId)
  }, [id, leftId, rightId, topId, bottomId, addNode])

  useEffect(() => {
    if (active) {
      setCurrentNode(id)
    }
    return () => releaseCurrentNode()
  }, [active, id, setCurrentNode, releaseCurrentNode])

  return enhancedChildren
}
