import { useState, useEffect } from 'react'
import { FocusState } from './FocusState'
import { SectionState } from './SectionState'

const useFocus = (id: string) => {
  const [hasFocus, setFocus] = useState(false)
  const { getNode, currentNode, setCurrentNode, addNode, deleteNode } =
    FocusState.getInstance()

  useEffect(() => {
    currentNode.subscribe(node => {
      setFocus(node?.id === id)
      console.log(`FocusState currentNode: ${node?.id}`)
    })
  }, [id, currentNode])
  return { hasFocus, currentNode, setCurrentNode, getNode, addNode, deleteNode }
}

const useSection = (id: string) => {
  const [isActive, setActive] = useState(false)
  const { getNode, currentNode, setCurrentNode, addNode, deleteNode } =
    SectionState.getInstance()

  useEffect(() => {
    currentNode.subscribe(node => {
      setActive(node?.id === id)
      console.log(`SectionState currentNode: ${node?.id}`)
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
export { useFocus, useSection }
