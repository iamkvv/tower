import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    blockscreen: props => ({
        display: props.mode === 'auto' || !props.gameStarted || props.gameOver || props.gamePaused ? 'flex' : 'none',
        gridArea: '2/1/3/2',
        pointerEvents: 'bounding-box', //'none' допускает DnD под этим div'ом,
        backgroundColor: 'transparent',  // '#fff', 
        zIndex: 1000,
        width: '100%',
        height: '100%'
    })
})

function BlockScreen(props) {
    console.log('Render Screen', props)
    const classes = useStyles(props)

    return (
        <div draggable="false" className={classes.blockscreen} />
    )
}

export default BlockScreen
