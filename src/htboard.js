import React, { forwardRef, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { GameContext } from './gameLayout'
import Peg from './peg'
import { renderDropCells, createDisks, renderDisks, renderPegs } from './helper'

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
        color: '#444',
        margin: 20,
    })
})

function HTBoard(props, ref) {
    //  const dispatch = useContext(GameContext);

    const styleData = { diskCount: props.diskCount, rowHeight: props.rowHeight }
    const classes = useStyles(styleData);
    // debugger

    useEffect(() => {
        //  debugger
        console.log("HTBoard!!", props, ref)

    }, [])



    let pegNames = ['A', 'B', 'C'];
    return (
        <div className={classes.board}
            ref={ref}
        >
            {renderDropCells(props.diskCount)}

            {createDisks(props.diskCount)}

            {
                pegNames.map((d, i) => (<Peg key={'p_' + i} l={pegNames[i]} k={(i * 2) + 1} />))
            }

        </div>
    )
}

HTBoard = forwardRef(HTBoard)
export default HTBoard