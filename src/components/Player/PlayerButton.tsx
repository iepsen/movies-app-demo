import React from 'react'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  children: React.ReactNode
  onClick: () => void
  hasFocus?: boolean
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    backgroundColor: 'rgb(200, 200, 200)',
    color: 'rgb(32, 32, 32)',
    '&:hover, &:focus': {
      backgroundColor: 'rgb(94, 146, 108)'
    },
    width: '5rem',
    height: '5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  buttonFocused: {
    margin: theme.spacing(2),
    backgroundColor: 'rgb(94, 146, 108)',
    color: 'rgb(32, 32, 32)',
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

const PlayerButton = ({ children, onClick, hasFocus = false }: Props): JSX.Element => {
  const classes = useStyles()
  return (
    <IconButton onClick={onClick} className={hasFocus ? classes.buttonFocused : classes.button}>
      {children}
    </IconButton>
  )
}

export { PlayerButton }
