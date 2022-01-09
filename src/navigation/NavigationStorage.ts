import { NavigationNode } from './NavigationNode'

export class NavigationStorage {
  public static instance: NavigationStorage
  private nodes?: Map<string, NavigationNode> = new Map()

  public static getInstance() {
    if (!NavigationStorage.instance) {
      NavigationStorage.instance = new NavigationStorage()
    }
    return NavigationStorage.instance
  }

  public addNode(
    id: string,
    left?: string,
    right?: string,
    top?: string,
    bottom?: string,
    onSelect?: () => void
  ) {
    if (this.nodes?.has(id)) {
      console.error(`Node ${id} already exists.`)
      return
    }
    const node = new NavigationNode(id, left, right, top, bottom, onSelect)
    this.nodes?.set(id, node)
  }

  public getNode(nodeId: string) {
    return this.nodes?.get(nodeId)
  }

  public getNodes() {
    return this.nodes
  }

  public deleteNode(node: NavigationNode) {
    this.nodes?.delete(node.id)
  }

  public clearNodes() {
    this.nodes?.clear()
  }
}
