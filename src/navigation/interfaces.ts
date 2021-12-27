import { ReactElement } from 'react'

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
  onClick?: () => void
}

interface InjectedSectionProps {
  id: string
  isActive: boolean
}

interface InjectedFocusProps {
  isFocused: boolean
}

export interface SectionInterface extends UseSectionInterface {
  index: number
  onActive?: (index: number) => void
  children: (props: InjectedSectionProps) => ReactElement
}

export interface FocusInterface extends UseFocusInterface {
  onFocus?: () => void
  children: (props: InjectedFocusProps) => ReactElement
}

export type CallbackEventType = (() => void) | (() => boolean) | null

export interface DeviceInterface {
  subscribe: (type: string, callback: CallbackEventType) => void
  unsubscribe: (type: string) => void
}
