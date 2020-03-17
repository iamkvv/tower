import React, { useContext, useCallback, useEffect } from 'react'

//import { GameContext } from './hanoi-tower'
import { GameContext } from './gameProvider'

import { renderDropCells, renderDisks } from './helper'
import { Actions } from './constants'


const Board = () => {
    const { state, dispatch } = useContext(GameContext);
    const { disks, rowHeight } = state;

    //let boardRef = null
    const board_Ref = useCallback(node => {
        if (node) {
            // boardRef = node;
            dispatch({ type: Actions.BOARDREF, boardref: node })
        }
    }, [])

    ////

    useEffect(() => {
        //dispatch({ type: 'TEST', boardref: 'node' })
        //     //  return () => {
        // console.log("use effect board", state)
        //     // dispatch({ type: 'START-GAME', startGame: sg })
    })//или []


    return (
        <div className='board'
            ref={board_Ref}
            style={{
                //height: `${30 * Object.keys(disks).length}px`,
                gridTemplateRows: `repeat(${Object.keys(disks).length}, ${rowHeight}px`
            }}
        >
            {renderDropCells(Object.keys(disks).length)}
            {renderDisks(disks)}
        </div>
    )
}

export default Board