export class NavigationNode {
  public id: string
  public left?: string = undefined
  public right?: string = undefined
  public top?: string = undefined
  public bottom?: string = undefined

  constructor(
    id: string,
    left?: string,
    right?: string,
    top?: string,
    bottom?: string
  ) {
    this.id = id
    this.left = left
    this.right = right
    this.top = top
    this.bottom = bottom
  }
}
