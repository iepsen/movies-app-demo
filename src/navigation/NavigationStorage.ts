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
    leftId?: string,
    rightId?: string,
    topId?: string,
    bottomId?: string,
    onSelect?: () => void,
    onBack?: () => void
  ) {
    if (this.nodes?.has(id)) {
      console.error(`Node ${id} already exists.`)
      return
    }
    const node = new NavigationNode(
      id,
      leftId,
      rightId,
      topId,
      bottomId,
      onSelect,
      onBack
    )
    this.nodes?.set(id, node)
  }

  public getNode(nodeId: string) {
    return this.nodes?.get(nodeId)
  }

  public getNodes() {
    return this.nodes
  }

  public deleteNode(nodeId: string) {
    this.nodes?.delete(nodeId)
  }

  public clearNodes() {
    this.nodes?.clear()
  }
}
