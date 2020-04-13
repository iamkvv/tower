import React from 'react'
import { headerStyles } from './styles'

const Header = (props) => {
    const classes = headerStyles();
    return (
        <div className={classes.header}>
            <div className={classes.caption} >
                Hanoi Tower
            </div>
            <div className={classes.menuWrapper}>
                {props.children}
            </div>
        </div>
    )
}

export default Header