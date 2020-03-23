import React, { useContext, useEffect, useRef, useLayoutEffect } from 'react'
import anime from 'animejs/lib/anime.es.js'

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import { GameContext } from './gameProvider'
import { Actions } from './constants'
import { buildMoves } from './helper'
import Board from './bo-ard'
import Controls from './controls'

import Mover from './mover'

import './App.css'

const GameLayout = () => {
    const { state, dispatch } = useContext(GameContext);
    const { disks, rowHeight, boardRef } = state;

    let stopGame = useRef(false);
    let HTmover = useRef(null);

    useEffect(() => {
        //  debugger

        if (state.boardRef) {
            console.log('Layout Mover', state)
            HTmover = new Mover(state.boardRef, Test)
        }

        if (state.gameStopped) {
            stopGame.current = true;
        }

        if (state.gameActive) {

            stopGame.current = false;
            const allMoves = buildMoves(Object.keys(disks).length);

            changePlace(allMoves[0]);
            //!!!TMP
            // const run = doMoves(allMoves);
            // state.boardRef.addEventListener('transitionend', (e) => handleTransitionEnd(e, run))
            //  run();
        }
    }, [state.gameStopped, state.boardRef])//или []


    const Test = (e) => {
        console.log('TEST', e)
    }

    useEffect(() => {
        console.log('gameActive', state)

    }, [state.gameActive])


    const handleTransitionEnd = (e, next) => {
        e.target.style.transition = 'none'
        e.target.style.transform = 'initial'
        e.target.style.gridArea = `${e.target.dataset.rowStart}` +
            `/${e.target.dataset.colStart}` +
            `/${e.target.dataset.rowEnd}` +
            `/${e.target.dataset.colEnd}`
        next();
    }

    // useEffect(() => {
    //     if (state.boardRef) {
    //         //??   state.boardRef.addEventListener('transitionend', (e) => handleTransitionEnd(e, state)) // (e) => {


    //         //     if (e.propertyName == "transform") {
    //         //         console.log('Transition ended', e);
    //         //         console.log('data', e.target.dataset.rowStart, e.target.dataset.colStart, e.target.dataset.rowEnd, e.target.dataset.colEnd)

    //         //         let currDisk = Object.values(state.disks)[e.target.dataset.idx]//  Object.values(disks)[move.disk - 1]

    //         //         // currDisk.rowStart = e.target.dataset.rowStart;
    //         //         // currDisk.colStart = e.target.dataset.colStart;
    //         //         // currDisk.rowEnd = e.target.dataset.rowEnd;
    //         //         // currDisk.colEnd = e.target.dataset.colEnd;

    //         //         e.target.style.transition = 'none'
    //         //         e.target.style.transform = 'initial'
    //         //         e.target.style.gridArea = `${e.target.dataset.rowStart}/${e.target.dataset.colStart}/${e.target.dataset.rowEnd}/${e.target.dataset.colEnd}`
    //         //         // debugger
    //         //         //   dispatch({ type: Actions.UPDATEDISK, disks: state.disks })
    //         //         // run()
    //         //         // e.target.dataset.cb()
    //         //     }
    //         // });
    //     }

    // }, [state.boardRef])

    const startGame = () => {

        const allMoves = buildMoves(Object.keys(disks).length);
        // let cr = 0;
        run = doMoves(allMoves);
        run();
    }

    const doMoves = (moves) => {
        let curr = 0;
        function callback() {
            if (curr < moves.length && !stopGame.current) {// !self.state.pause) {
                changePlace(moves[curr++])//, callback);
            }
        }
        return callback;
    }

    const changePlace = (move) => {
        let currDisk = Object.values(disks)[move.disk - 1]

        //let diskCount_ColTo = Object.values(disks).filter(d => d.colStart === move.to).length;//кол-во дисков на целевом столбце
        let diskCount_ColTo = Object.values(disks).filter(d => d.ref.style.gridArea.split('/')[1] == move.to).length


        let newNumRow = Object.values(disks).length == 1 ? 1 : Object.values(disks).length - diskCount_ColTo
        let newLeft = (move.to - move.from) * (boardRef.offsetWidth / 3) //Left Top координаты

        //let newTop = (newNumRow - Object.values(disks)[move.disk - 1].rowStart) * rowHeight// * newNumRow//top нового адреса
        let newTop = (newNumRow - currDisk.ref.style.gridArea.split('/')[0]) * rowHeight


        //  debugger
        //currDisk.ref.setAttribute('style', `top:${newTop}px; left:${newLeft}px;`); //top = newTop + 'px';
        //currDisk.ref.style.top = `${newTop}px`
        //currDisk.ref.style.left = `${newLeft}px`


        // debugger
        // currDisk.ref.dataset.cb = cb;

        currDisk.ref.dataset.idx = move.disk - 1;
        currDisk.ref.dataset.rowStart = newNumRow;
        currDisk.ref.dataset.colStart = move.to
        currDisk.ref.dataset.rowEnd = newNumRow + 1;
        currDisk.ref.dataset.colEnd = move.to + 1

        currDisk.ref.style.zIndex = parseInt(currDisk.ref.style.zIndex) + 1

        currDisk.ref.style.transition = 'transform 1s ease-out'
        currDisk.ref.style.transform = `translate(${newLeft}px,${newTop}px)`
        //    return
        /*
                anime({
                    targets: Object.values(disks)[move.disk - 1].ref,
                    left: newLeft,
                    top: newTop,
                    duration: 600,
                    easing: 'cubicBezier(.9, .9, .01, .01)',
        
                    begin: function (anim) {
                        currDisk.ref.style.zIndex = parseInt(currDisk.ref.style.zIndex) + 1
                    },
                    complete: function (anim) {
                        currDisk.rowStart = newNumRow;
                        currDisk.colStart = move.to;
                        currDisk.rowEnd = newNumRow + 1;
                        currDisk.colEnd = move.to + 1
        
                        dispatch({ type: Actions.UPDATEDISK, disks: state.disks })
        
                        currDisk.ref.style.top = 0;
                        currDisk.ref.style.left = 0;
        
                        setTimeout(() => {
                            cb()
                        }, 100);
                    }
                });
          */

    }

    return (
        <div className='game'>
            {state.gameStopped.toString()}
            <DndProvider backend={Backend}>
                <Board />
            </DndProvider>
            <Controls />
        </div>
    )
}

export default GameLayout