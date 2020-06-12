import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  text: string
  onClick: () => void
  hasFocus?: boolean
}

const useStyles = makeStyles((theme) => ({
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

const ActionButton = ({ text, onClick, hasFocus = false }: Props): JSX.Element => {
  const classes = useStyles()
  return (
    <Button onClick={onClick}
      variant="contained"
      className={hasFocus ? classes.buttonFocused : classes.button}>
      {text}
    </Button>
  )
}

export { ActionButton }
