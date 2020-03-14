import React, { useReducer, useRef, useCallback } from 'react'
import anime from 'animejs/lib/anime.es.js'
import { buildMoves, createDisks } from './helper'
import Board from './bo-ard'
import Controls from './controls'
import './App.css'

const BoardContext = React.createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'change':
            // debugger
            return Object.assign({}, state, { disks: action.arr });
        case 'DISK-COUNT':
            console.log("DISK-COUNT", state, action)
            return Object.assign({}, state, { disks: createDisks(action.count) });

        case 'SET-DISKREF':
            return Object.assign({}, state, state.diskRefs[action.diskref.idx] = action.diskref.ref);

        case 'BOARD-REF':
            return Object.assign({}, state, { boardRef: action.boardref });

        default:
            throw new Error();
    }
}
function init(diskcount) {
    return {
        disks: createDisks(diskcount),
        boardRef: null,
        diskRefs: {}
    }
}

const BoardProvider = () => {
    const [state, dispatch] = useReducer(reducer, 2, init);

    const startGame = () => {
        const allMoves = buildMoves(Object.keys(state.disks).length);
        let run = doMoves(allMoves);
        run();
    }

    const doMoves = (moves) => {
        let curr = 0;

        function callback() {
            if (curr < moves.length) {// !self.state.pause) {
                changePlace(moves[curr++], callback)
            }
        }
        return callback;
    }

    const changePlace = (move, cb) => {
        let diskCount_ColTo = Object.values(state.disks).filter(d => d.colStart === move.to).length;//кол-во дисков на целевом столбце
        let newNumRow = Object.values(state.disks).length == 1 ? 1 : Object.values(state.disks).length - diskCount_ColTo
        let newLeft = (move.to - move.from) * (state.boardRef.offsetWidth / 3) //Left Top координаты
        let newTop = (newNumRow - Object.values(state.disks)[move.disk - 1].rowStart) * 30// * newNumRow//top нового адреса

        anime({
            targets: Object.values(state.disks)[move.disk - 1].ref,//   state.disks[move.disk - 1].ref,   //state.diskRefs[move.disk - 1],
            left: newLeft,
            top: newTop,
            duration: 600,
            easing: 'cubicBezier(.5, .05, .9, .6)',

            begin: function (anim) {
                this.animatables[0].target.style.zIndex = parseInt(this.animatables[0].target.style.zIndex) + 1
            },
            complete: function (anim) {
                let currDisk = Object.values(state.disks)[move.disk - 1]
                currDisk.rowStart = newNumRow;
                currDisk.colStart = move.to;
                currDisk.rowEnd = newNumRow + 1;
                currDisk.colEnd = move.to + 1

                dispatch({ type: 'change', arr: state.disks })
                currDisk.ref.style.top = 0;
                currDisk.ref.style.left = 0;

                setTimeout(() => { cb() }, 100);
            }
        });
    }

    return (
        <BoardContext.Provider value={{ state, dispatch }}>
            <div className='game'>
                <Board />
                <Controls startGame={startGame} />
            </div>
        </BoardContext.Provider>
    )
}

export { BoardProvider, BoardContext }