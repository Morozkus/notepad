import React, { FC } from 'react'
import classes from './PageInput.module.css'

interface PageInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

}

const PageInput: FC<PageInputProps> = (props) => {
  return (
    <input type="text" className={classes.pageInput} {...props} />
  )
}

export default PageInput