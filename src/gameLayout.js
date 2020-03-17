import React, { useContext, useEffect, useRef } from 'react'
import anime from 'animejs/lib/anime.es.js'

import { GameContext } from './gameProvider'

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import { Actions } from './constants'
import { buildMoves } from './helper'
import Board from './bo-ard'
import Controls from './controls'
//import { Actions } from './constants'
import './App.css'


const GameLayout = () => {
    const { state, dispatch } = useContext(GameContext);
    const { disks, rowHeight, boardRef } = state;

    let stopGame = useRef(false)

    useEffect(() => {

        // debugger
        //dispatch({ type: 'TEST', boardref: 'node' })
        //     //  return () => {
        console.log("use effect gameLayout", state)
        if (state.gameStopped) {
            stopGame.current = true;
        }

        if (state.gameActive) {
            stopGame.current = false;
            const allMoves = buildMoves(Object.keys(disks).length);
            const run = doMoves(allMoves);
            run();
        }
    }, [state.gameActive, state.gameStopped])//или []

    const startGame = () => {

        const allMoves = buildMoves(Object.keys(disks).length);
        let cr = 0;
        let run = doMoves(allMoves, cr);
        run();
    }

    const doMoves = (moves) => {
        let curr = 0;
        function callback() {
            console.log("callback?")

            if (curr < moves.length && !stopGame.current) {// !self.state.pause) {
                changePlace(moves[curr++], callback);
            }
        }
        return callback;
    }

    const changePlace = (move, cb) => {
        console.log('place', state)

        let currDisk = Object.values(disks)[move.disk - 1]

        let diskCount_ColTo = Object.values(disks).filter(d => d.colStart === move.to).length;//кол-во дисков на целевом столбце
        let newNumRow = Object.values(disks).length == 1 ? 1 : Object.values(disks).length - diskCount_ColTo
        let newLeft = (move.to - move.from) * (boardRef.offsetWidth / 3) //Left Top координаты
        let newTop = (newNumRow - Object.values(disks)[move.disk - 1].rowStart) * rowHeight// * newNumRow//top нового адреса

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