import { useState, useEffect } from 'react'
import { FocusNodeState } from './FocusNodeState'
import { FocusAreaState } from './FocusAreaState'

const useFocusNode = (id: string) => {
  const [hasFocus, setFocus] = useState(false)
  const { getNode, currentNode, setCurrentNode, addNode, deleteNode } =
    FocusNodeState.getInstance()

  useEffect(() => {
    currentNode.subscribe(node => {
      setFocus(node?.id === id)
      return () => currentNode.unsubscribe()
    })
  }, [id, currentNode])
  return { hasFocus, currentNode, setCurrentNode, getNode, addNode, deleteNode }
}

const useFocusArea = (id: string) => {
  const [isActive, setActive] = useState(false)
  const { getNode, currentNode, setCurrentNode, addNode, deleteNode } =
    FocusAreaState.getInstance()

  useEffect(() => {
    currentNode.subscribe(node => {
      setActive(node?.id === id)
      return () => currentNode.unsubscribe()
    })
  }, [id, currentNode])

  return {
    isActive,
    currentNode,
    setCurrentNode,
    getNode,
    addNode,
    deleteNode
  }
}
export { useFocusNode, useFocusArea }
