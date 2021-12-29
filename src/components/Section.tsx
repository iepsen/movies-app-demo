import { cloneElement, ReactElement, useEffect } from 'react'
import { useSection } from '../navigation'

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
  const { isActive, addNode, setCurrentNode } = useSection(id)
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
  }, [active, id, setCurrentNode])

  return enhancedChildren
}
