import React, { forwardRef, useContext, useRef, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { GameContext } from './gameProvider'

import { renderDropCells, renderDisks, renderPegs } from './helper'
import { Actions } from './constants'
import Peg from './peg'

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

//const Board = React.memo(
function Board(props, ref) {
    const { state, dispatch } = useContext(GameContext);
    const { disks, rowHeight } = state;

    const styleData = { diskCount: Object.keys(disks).length, rowHeight: rowHeight }
    const classes = useStyles(styleData);



    let pegNames = ['A', 'B', 'C'];

    return (
        <div className={classes.board}
            ref={ref}//  {testBoard}//{board_Ref}
        >


            {renderDropCells(Object.keys(disks).length)}

            {renderDisks(disks)}
            {/* {state.boardRef && renderPegs()} */}

            {
                pegNames.map((d, i) => (<Peg key={'p_' + i} l={pegNames[i]} k={(i * 2) + 1} />))
            }

        </div>
    )
}

//)

Board = forwardRef(Board)
export default Board