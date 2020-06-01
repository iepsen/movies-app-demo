import { useSection } from './useSection'
import { SectionInterface } from './interfaces'

const Section = ({ children, ...props }: SectionInterface): JSX.Element => children({ isActive: useSection(props) })

export { Section }
