import React from 'react'
import { footerStyles } from './styles'
import Timer from './timer'

const Manual = (props) => {
    return (
        <div className={props.class}>
            Move discs from column 'A' to column 'B'.
            A larger disk cannot be placed on a smaller one.
            You can play in automatic and manual mode.
            In manual mode use Drag&Drop.
        </div>
    )
}

const Footer = (props) => {
    const classes = footerStyles(props);
    return (
        <div className={classes.footer}>
            {!props.gameStarted ?
                < Manual class={classes.manual} /> :
                <Timer {...props} />
            }
        </div>
    )
}

export default Footer