import clsx from 'clsx'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type ActionButtonProps = {
  text: string
  onClick: () => void
  hasFocus?: boolean
  className?: string
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: 'rgb(200, 200, 200)',
    width: '20rem',
    height: '5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  buttonFocused: {
    margin: theme.spacing(1),
    backgroundColor: 'rgb(144, 206, 161)',
    width: '20rem',
    height: '5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  }
}))

export const ActionButton = ({
  text,
  onClick,
  hasFocus = false,
  className
}: ActionButtonProps): JSX.Element => {
  const classes = useStyles()
  const buttonStyle = clsx(
    hasFocus && classes.buttonFocused,
    !hasFocus && classes.button,
    className && className
  )
  return (
    <Button onClick={onClick} variant="contained" className={buttonStyle}>
      {text}
    </Button>
  )
}
