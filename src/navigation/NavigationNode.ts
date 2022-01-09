export class NavigationNode {
  public id: string
  public leftId?: string = undefined
  public rightId?: string = undefined
  public topId?: string = undefined
  public bottomId?: string = undefined
  public onSelect?: () => void = undefined
  public onBack?: () => void = undefined

  constructor(
    id: string,
    leftId?: string,
    rightId?: string,
    topId?: string,
    bottomId?: string,
    onSelect?: () => void,
    onBack?: () => void
  ) {
    this.id = id
    this.leftId = leftId
    this.rightId = rightId
    this.topId = topId
    this.bottomId = bottomId
    this.onSelect = onSelect
    this.onBack = onBack
  }
}
