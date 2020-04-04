import React, { forwardRef, useContext, useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { GameContext } from './gameLayout'

import Mover from './mover'
import { renderDropCells, createDisks, renderDisks, renderPegs } from './helper'
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

function Board(props, ref) {
    const dispatch = useContext(GameContext);
    // const { diskCount, moveCount, rowHeight, boardRef } = state;

    const styleData = { diskCount: props.diskCount, rowHeight: 30, x: props.antimemo }//  rowHeight }
    const classes = useStyles(styleData);

    // const [board, setBoard] = useState(null); //заменить на передачу функции!!
    // let mover = null;

    useEffect(() => {//сохраняем ссылку на диски в board
        if (!ref.current) return

        let brd = Object.values(ref.current.children).filter(d => d.className.includes('disk'))
            .map(s => getComputedStyle(s));

        // setBoard(brd);////заменить на передачу функции!!

        // 
        // if (!mover) {
        //debugger
        ref.current.zzz = false;
        const mover = new Mover(ref.current, props.diskCount, dispatch)
        // }

        props.getMover(mover)

        // console.log(' Board useEffect getMover', ref)
    }, []) ///[props.diskCount, props.gameNew])

    useEffect(() => {
        console.log('board useeffect [] ??');
        // if (!mover) {
        //     //debugger
        //     mover = new Mover(ref.current, props.diskCount, dispatch)
        // }

        // props.getMover(mover)

    }, [])


    let boardTest = (e) => { console.log("E", e); return ref } //возвращает ссылку на board -  для disk и dropCell сделать разные функции

    const boardRef = () => {
        return Object.values(ref.current.children).filter(d => d.className.includes('disk'))
            .map(s => getComputedStyle(s));
    }

    let pegNames = ['A', 'B', 'C'];
    console.log(' Board render')
    return (
        <div className={classes.board}
            ref={ref}
        >

            {renderDropCells(props.diskCount, () => boardRef())}
            {createDisks(props.diskCount, () => boardRef(), boardTest)}

            {
                pegNames.map((d, i) => (<Peg key={'p_' + i} l={pegNames[i]} k={(i * 2) + 1} />))
            }
        </div>
    )
}

Board = forwardRef(Board)
export default Board