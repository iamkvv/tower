import React from 'react'
import { headerStyles } from './styles'
import logo from './react.svg'

const Header = (props) => {
    const classes = headerStyles();
    return (
        <div style={{ position: 'relative' }}>
            <img className={classes.appLogo} src={logo} />

            <div className={classes.header}>
                <div className={classes.caption} >
                    Hanoi Tower
            </div>
                <div className={classes.menuWrapper}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Header