import React, { FC, ReactNode } from 'react'
import classes from './PageButton.module.css'

interface pageButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: ReactNode,
}  

const PageButton: FC<pageButtonProps> = ({children, ...props}) => {
  return (
    <button {...props} className={classes.pageButton}>
        {children}
    </button>
  )
}

export default PageButton