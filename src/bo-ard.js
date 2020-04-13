import React, { forwardRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { renderDropCells, renderDisks, renderPegs } from './helper'

const useStyles = makeStyles({
    board: props => ({
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: `repeat(${props.diskCount}, ${props.rowHeight}px)`,
        gridArea: '2/1/3/2',
        gridGap: 2,
        justifyItems: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // color: '#444',
        boxShadow: '3px 3px 1px 0px #d4b8b8',
        margin: 20,
    })
})

function Board(props, ref) {
    const styleData = { diskCount: props.diskCount, rowHeight: props.rowHeight }
    const classes = useStyles(styleData);
    //  console.log('Render Board', props)

    useEffect(() => {
        if (!ref.current) return

        if (props.mode === 'auto')
            props.createMover()
    }, [props.diskCount, props.gameNew, props.mode])

    const boardRef = () => {
        return Object.values(ref.current.children).filter(d => d.className.includes('disk'))
            .map(s => getComputedStyle(s));
    }

    return (
        <div className={classes.board}
            ref={ref}>

            {
                renderDropCells(props.diskCount, () => boardRef())
            }
            {
                renderDisks(
                    props.diskCount,
                    props.mode,
                    () => boardRef(),
                )
            }
            {
                renderPegs()
            }
        </div>
    )
}

Board = forwardRef(Board)
export default Board