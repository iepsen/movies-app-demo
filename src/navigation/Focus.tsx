import { useFocus } from './useFocus'
import { FocusInterface } from './interfaces'

const Focus = ({ children, onFocus, ...props }: FocusInterface): JSX.Element => {
  const isFocused = useFocus(props)

  if (isFocused && onFocus) {
    onFocus(props.index)
  }
  return children({ isFocused })
}

export { Focus }
