export interface UseSectionInterface {
  id: string
  active?: boolean
  onUp?: string
  onDown?: string
  onLeft?: string
  onRight?: string
}

interface InjectedProps {
  isActive: boolean
}

export interface SectionInterface extends UseSectionInterface {
  children: (props: InjectedProps) => JSX.Element
}
