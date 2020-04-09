import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    blockscreen: props => ({
        display: props.mode === 'auto' || !props.gameStarted || props.gameOver || props.gamePaused ? 'flex' : 'none',
        gridArea: '2/1/3/2', //`1/1/${props.diskCount + 1}/4`,
        pointerEvents: 'bounding-box', //'none' допускает DnD под этим div'ом,
        backgroundColor: 'transparent',  // '#fff', 
        zIndex: 1000,
        // opacity: 0.8,
        width: '100%',
        height: '100%' // parseInt(getComputedStyle(props.board.current).height) + 50
    })
})

//Перенести это в Board!!!

function BlockScreen(props) {
    console.log('Render Screen', props)
    //??? if (!props.board.current) return;

    const classes = useStyles(props)

    return (
        <div draggable="false" className={classes.blockscreen} />
    )
}

export default BlockScreen
