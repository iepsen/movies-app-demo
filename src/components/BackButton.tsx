import { IconButton } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { ReactElement } from 'react'

type BackButtonProps = {
  onClick: () => void
  hasFocus?: boolean
}

const useStyles = makeStyles(theme => ({
  button: {
    marginBottom: theme.spacing(10),
    backgroundColor: 'rgb(200, 200, 200)',
    color: 'rgb(32, 32, 32)',
    '&:hover, &:focus': {
      backgroundColor: 'rgb(144, 206, 161)'
    },
    position: 'absolute',
    top: '5%',
    left: '3%',
    zIndex: 10,
    width: '5rem',
    height: '5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  buttonFocused: {
    marginBottom: theme.spacing(10),
    backgroundColor: 'rgb(144, 206, 161)',
    color: 'rgb(32, 32, 32)',
    '&:hover, &:focus': {
      backgroundColor: 'rgb(144, 206, 161)'
    },
    position: 'absolute',
    top: '5%',
    left: '3%',
    zIndex: 10,
    width: '5rem',
    height: '5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  icon: {
    width: '100%',
    height: '100%'
  }
}))

export const BackButton = ({
  onClick,
  hasFocus = false
}: BackButtonProps): ReactElement => {
  const classes = useStyles()
  return (
    <IconButton
      onClick={onClick}
      className={hasFocus ? classes.buttonFocused : classes.button}
    >
      <ArrowBack className={classes.icon} />
    </IconButton>
  )
}
