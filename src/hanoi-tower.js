import React, { useReducer, useCallback, useEffect } from 'react'

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import anime from 'animejs/lib/anime.es.js'

import { buildMoves, createDisks } from './helper'
import Board from './bo-ard'
import Controls from './controls'
import { Actions } from './constants'
import './App.css'

const GameContext = React.createContext();

function reducer(state, action) {
    switch (action.type) {
        case Actions.UPDATEDISK:
            return Object.assign({}, state, { disks: action.disks });

        case Actions.DISKCOUNT:
            return Object.assign({}, ...state, { disks: createDisks(action.count) });

        // case Actions.DISKREF:
        //     return Object.assign({}, state, state.diskRefs[action.diskref.idx] = action.diskref.ref);

        case Actions.BOARDREF:
            return Object.assign({}, state, { boardRef: action.boardref });

        case Actions.GAMEACTIVE:
            return Object.assign({}, state, { gameActive: true });


        case Actions.GAMESTOPPED:
            return Object.assign({}, state, { gameStopped: true });

        case 'TEST':
            return Object.assign({}, state, { timer: !state.timer })

        case 'START-GAME':
            return Object.assign({}, state, { startGame: action.startGame })


        default:
            throw new Error();
    }
}




function init(diskcount) {
    return {
        disks: createDisks(diskcount),
        boardRef: null,
        // diskRefs: {},
        rowHeight: 30,
        gameActive: false,
        gameStopped: false,
        timer: false,
        startGame: null
    }
}

const HanoiTower = () => {
    const [state, dispatch] = useReducer(reducer, 2, init);
    const { disks, rowHeight, boardRef } = state;


    const stopGame = () => {
        dispatch({ type: Actions.GAMESTOPPED });
        setStop(true)
    }

    useEffect(() => {
        // dispatch({ type: Actions.GAMESTOPPED });
        console.log("use effect controls", state)

        if (state.gameStopped) {
            stopped = true
            dispatch({ type: Actions.GAMESTOPPED });
        }
        // dispatch({ type: 'START-GAME', startGame: sg })
    }, [state.gameStopped]);

    const startGame = () => {
        dispatch({ type: Actions.GAMEACTIVE });

        const allMoves = buildMoves(Object.keys(disks).length);
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
        console.log('changePlace', state);
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

                setTimeout(() => { cb() }, 100);
            }
        });
    }

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            <div className='game'>
                <h3>{state.gameStopped.toString()}</h3>
                <DndProvider backend={Backend}>
                    <Board />
                </DndProvider>
                <Controls stopGame={stopGame} startGame={startGame} />
            </div>
        </GameContext.Provider>
    )
}

export { HanoiTower, GameContext }