import { useEffect } from 'react'
import { useSection } from '../navigation/useSection'
import { SectionInterface } from '../navigation/interfaces'

const Section = (props: SectionInterface): JSX.Element => {
  const { onActive, children, id } = props
  const isActive = useSection(props)

  useEffect(() => {
    if (isActive && onActive) {
      onActive(props.index)
    }
  }, [isActive])

  return children({ id, isActive })
}

export { Section }
