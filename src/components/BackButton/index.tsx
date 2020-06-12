import React from 'react'
import { IconButton } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Focus from '../Focus'

type Props = {
  onBack: () => void
  onUp?: string
  onDown?: string
  onLeft?: string
  onRight?: string
}

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: theme.spacing(10),
    backgroundColor: 'rgb(200, 200, 200)',
    color: 'rgb(32, 32, 32)',
    '&:hover, &:focus': {
      backgroundColor: 'rgb(144, 206, 161)'
    },
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

const BackButton = ({ onBack, onUp, onDown, onLeft, onRight }: Props): JSX.Element => {
  const classes = useStyles()
  return (
    <Focus id="back-button" onClick={onBack} upId={onUp} downId={onDown} leftId={onLeft} rightId={onRight}>
      <IconButton onClick={onBack} className={classes.button}>
        <ArrowBack className={classes.icon} />
      </IconButton>
    </Focus>
  )
}

export { BackButton }
