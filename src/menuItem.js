import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { menuStyles } from './styles'

const MenuItem = (props) => {
    const classes = menuStyles(props);

    return (
        <React.Fragment>
            {
                ReactDOM.createPortal(
                    <React.Fragment>
                        <div className={classes.menuSwitcher}
                            onClick={() => props.handleClose()}>
                        </div>
                        {props.children}
                    </React.Fragment>,
                    document.body)
            }
        </React.Fragment>
    )
}

export default MenuItem