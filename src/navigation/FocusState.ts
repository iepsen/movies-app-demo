import { fromEvent, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN, KEY_OK } from './keys/computer'
import { NavigationNode } from './NavigationNode'
import { NavigationStorage } from './NavigationStorage'

export abstract class FocusState {
  public navigationStorage: NavigationStorage
  public currentNode = new BehaviorSubject<NavigationNode | undefined>(
    undefined
  )

  constructor() {
    this.addNode = this.addNode.bind(this)
    this.getNode = this.getNode.bind(this)
    this.deleteNode = this.deleteNode.bind(this)
    this.clearNodes = this.clearNodes.bind(this)
    this.consumeEvent = this.consumeEvent.bind(this)
    this.setCurrentNode = this.setCurrentNode.bind(this)
    this.releaseCurrentNode = this.releaseCurrentNode.bind(this)

    this.navigationStorage = NavigationStorage.getInstance()

    fromEvent(document, 'keydown')
      .pipe(map(event => event as KeyboardEvent))
      .subscribe(this.consumeEvent)
  }

  public consumeEvent(event: KeyboardEvent) {
    if (!this.currentNode.getValue()) {
      return
    }

    let nodeId
    switch (event.key) {
      case KEY_LEFT:
        nodeId = this.currentNode.getValue()?.left
        break
      case KEY_RIGHT:
        nodeId = this.currentNode.getValue()?.right
        break
      case KEY_UP:
        nodeId = this.currentNode.getValue()?.top
        break
      case KEY_DOWN:
        nodeId = this.currentNode.getValue()?.bottom
        break
      case KEY_OK:
        this.currentNode.getValue()?.onSelect?.()
        break
      default:
        nodeId = undefined
        break
    }

    if (!nodeId) return

    if (!this.navigationStorage.getNodes()?.has(nodeId)) {
      console.error(`Node with id ${nodeId} not found.`)
      return
    }
    this.currentNode.next(this.navigationStorage.getNodes()?.get(nodeId))
  }

  public setCurrentNode(nodeId: string) {
    if (!this.navigationStorage.getNodes()?.has(nodeId)) {
      console.error(`Node with id ${nodeId} not found.`)
      return
    }
    this.currentNode.next(this.navigationStorage.getNodes()?.get(nodeId))
  }

  public releaseCurrentNode() {
    this.currentNode.next(undefined)
  }

  public addNode(
    id: string,
    left?: string,
    right?: string,
    top?: string,
    bottom?: string,
    onSelect?: () => void
  ) {
    this.navigationStorage.addNode(id, left, right, top, bottom, onSelect)
  }

  public getNode(nodeId: string) {
    return this.getNodes()?.get(nodeId)
  }

  public getNodes() {
    return this.navigationStorage.getNodes()
  }

  public deleteNode(node: NavigationNode) {
    this.getNodes()?.delete(node.id)
  }

  public clearNodes() {
    this.getNodes()?.clear()
  }
}
