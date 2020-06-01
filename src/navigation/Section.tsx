import { useSection } from './useSection'
import { SectionInterface } from './interfaces'

const Section = ({ children, onActive, ...props }: SectionInterface): JSX.Element => {
  const isActive = useSection(props)

  if (isActive && onActive) {
    onActive(props.index)
  }
  return children({ isActive })
}

export { Section }
