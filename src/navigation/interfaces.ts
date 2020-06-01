export interface UseSectionInterface {
  id: string
  active?: boolean
  onUp?: string
  onDown?: string
  onLeft?: string
  onRight?: string
}
export interface UseFocusInterface {
  id: string
  focus?: boolean
  onUp?: string
  onDown?: string
  onLeft?: string
  onRight?: string
}

interface InjectedSectionProps {
  isActive: boolean
}

interface InjectedFocusProps {
  isFocused: boolean
}

export interface SectionInterface extends UseSectionInterface {
  index: number
  onActive?: (index: number) => void
  children: (props: InjectedSectionProps) => JSX.Element
}

export interface FocusInterface extends UseFocusInterface {
  index: number
  onFocus?: (index: number) => void
  children: (props: InjectedFocusProps) => JSX.Element
}
