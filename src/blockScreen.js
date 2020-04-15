import React from 'react'
import { blockerStyles } from './styles'

function BlockScreen(props) {
    const classes = blockerStyles(props)

    return (
        <div draggable="false" className={classes.manualblock} />
    )
}

export default BlockScreen
