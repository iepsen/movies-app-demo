export interface UseSectionInterface {
  id: string
  active?: boolean
  onUp?: string
  onDown?: string
  onLeft?: string
  onRight?: string
  onActive?: (index: number) => void
}

interface InjectedProps {
  isActive: boolean
}

export interface SectionInterface extends UseSectionInterface {
  index: number
  children: (props: InjectedProps) => JSX.Element
}
