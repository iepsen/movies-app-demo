export class NavigationNode {
  public id: string
  public left?: string = undefined
  public right?: string = undefined
  public top?: string = undefined
  public bottom?: string = undefined
  public onSelect?: () => void = undefined

  constructor(
    id: string,
    left?: string,
    right?: string,
    top?: string,
    bottom?: string,
    onSelect?: () => void
  ) {
    this.id = id
    this.left = left
    this.right = right
    this.top = top
    this.bottom = bottom
    this.onSelect = onSelect
  }
}
