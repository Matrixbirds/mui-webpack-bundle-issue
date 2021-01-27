import React, { ReactChild, ReactEventHandler } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Button as MButton} from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#DFB635',
    },
    secondary: {
      main: '#A7A7A7',
    }
  },
  typography: {
    fontFamily: [
      'SourceHanSansCN-Regular',
      'Microsoft YaHei',
      'sans-serif',
    ].join(','),
    button: {
      label: {
        color: '#ffffff',
        fontSize: '8px',
        lineHeight: '9px',
        fontWeight: '400'
      }
    }
  }
});

type ThemeProps = Required<{children: ReactChild}>

export const CustomizeTheme = (props: ThemeProps) => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}

const noop = () => {}

const useButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    primary: {
      width: '60px',
      minWidth: '60px',
      padding: '0',
      height: '20px',
      borderRadius: '10px',
      fontWeight: 400,
      '&:hover': {
        backgroundColor: '#ECC54C'
      },
      '&:active': {
        backgroundColor: '#D7AA1E',
      },
      textTransform: 'none',
    },
    secondary: {
      width: '60px',
      minWidth: '60px',
      padding: '0',
      height: '20px',
      borderRadius: '10px',
      fontWeight: 400,
      // '&:hover': {
      //   backgroundColor: '#ECC54C'
      // },
      // '&:active': {
      //   backgroundColor: '#D7AA1E',
      // },
      textTransform: 'none',
    },
    label: {
      color: '#ffffff',
      fontSize: '8px',
      lineHeight: '9px',
    }
  }),
)

export interface ButtonProps {
  text: string,
  color?: "primary" | "secondary",
  onClick?: ReactEventHandler<any>,
}

export const Button = (props: ButtonProps = {text: '', color: 'primary'}) => {
  const classes = useButtonStyles()

  const classKey = props.color === "primary" ? classes.primary : classes.secondary

  const onClick = props.onClick ? props.onClick : noop

  return (
    <CustomizeTheme>
      <MButton onClick={onClick} classes={{root: classKey, label: classes.label}} variant="contained" color={props.color} disableElevation disableRipple>
        {props.text}
      </MButton>
    </CustomizeTheme>
  )
}
export interface CustomButtonProps {
  className?: string,
  onClick?: ReactEventHandler<any>,
  children?: ReactChild,
  component: React.ElementType
}

export const CustomButton = (props: CustomButtonProps) => {
  return (
    <CustomizeTheme>
      <MButton
        disableElevation
        disableRipple
        component={props.component}
        className={props.className}
        onClick={props.onClick}>
        {props.children ? props.children : ''}
      </MButton>
    </CustomizeTheme>
  )
}