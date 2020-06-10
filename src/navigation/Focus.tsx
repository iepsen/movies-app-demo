import { useEffect } from 'react'
import { useFocus } from './useFocus'
import { FocusInterface } from './interfaces'

const Focus = ({ children, onFocus, ...props }: FocusInterface): JSX.Element => {
  const isFocused = useFocus(props)

  useEffect(() => {
    if (isFocused && onFocus) {
      onFocus()
    }
  }, [isFocused])
  return children({ isFocused })
}

export { Focus }
