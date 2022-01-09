import {
  cloneElement,
  isValidElement,
  ReactElement,
  createElement,
  useEffect
} from 'react'
import { useFocusArea } from '../navigation'

type SectionProps = {
  id: string
  active?: boolean
  leftId?: string
  rightId?: string
  topId?: string
  bottomId?: string
  onSelect?: () => void
  onBack?: () => void
  children: ReactElement | ReactElement[]
}

export const Section = ({
  id,
  active = false,
  leftId,
  rightId,
  topId,
  bottomId,
  onSelect,
  onBack,
  children
}: SectionProps): ReactElement => {
  const {
    isActive,
    addNode,
    deleteNode,
    getNode,
    setCurrentNode,
    releaseCurrentNode
  } = useFocusArea(id)

  let enhancedChildren
  if (isValidElement(children)) {
    enhancedChildren = cloneElement(children, {
      ...children.props,
      isActive
    })
  }

  useEffect(() => {
    if (getNode(id)) {
      deleteNode(id)
    }

    addNode(id, leftId, rightId, topId, bottomId, onSelect, onBack)
  }, [
    id,
    leftId,
    rightId,
    topId,
    bottomId,
    addNode,
    onSelect,
    onBack,
    getNode,
    deleteNode
  ])

  useEffect(() => {
    if (active) {
      setCurrentNode(id)
    }
    return () => releaseCurrentNode()
  }, [active, id, setCurrentNode, releaseCurrentNode])

  return enhancedChildren ?? createElement('div', null, children)
}
