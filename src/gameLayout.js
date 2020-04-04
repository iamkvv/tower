import React, { useReducer, useEffect, useRef, useMemo, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import { Actions } from './constants'
import { buildMoves } from './helper'

import Board from './bo-ard'
//import HTBoard from './htboard'

import Controls from './controls'

import Mover from './mover'
import './App.css'

const GameContext = React.createContext();

function reducer(state, action) {
    switch (action.type) {

        case Actions.DISKCOUNT:
            return Object.assign({}, state, { diskCount: action.diskcount });

        case Actions.DISKMOVED:
            return Object.assign({}, state, { moveCount: state.moveCount + 1 });

        case Actions.BOARDREF:
            return Object.assign({}, state, { boardRef: action.boardref });

        case Actions.GAMESTARTED:
            return Object.assign({}, state, { gameStarted: !state.gameStarted });

        case Actions.GAMESTOPPED:
            return Object.assign({}, state, { gameStopped: true, gameActive: false });

        case Actions.GAMENEW:
            return Object.assign({}, state, { antimemo: state.antimemo + 1, gameNew: !state.gameNew, diskCount: 2, moveCount: 0 });

        case 'TEST':
            return Object.assign({}, state, { timer: !state.timer })

        case 'START-GAME':
            return Object.assign({}, state, { startGame: action.startGame })

        default:
            debugger
            throw new Error();
    }
}

function init(diskcount) {
    return {
        //disks: createDisks(diskcount),
        diskCount: diskcount,
        moveCount: 0,
        boardRef: null,
        rowHeight: 30,
        antimemo: 0,

        gameStarted: false,
        gameStopped: false,
        gameNew: false,
        timer: false,
        startGame: null
    }
}

const GameLayout = () => {
    const [state, dispatch] = useReducer(reducer, 2, init);
    //const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const { diskCount, gameNew, rowHeight } = state;

    const rootRef = useRef()

    const board_Ref = useRef()

    let mover = useRef(null);

    const getMover = (_mover) => {
        //mover.current = d
        //mover.current = null
        // debugger
        mover.current = _mover
        // console.log('getMover', _mover)
    }

    const mBoard = useMemo(() => <Board
        ref={board_Ref}
        getMover={getMover}
        diskCount={state.diskCount}
        gameNew={state.gameNew}
        rowHeight={state.rowHeight}
    />, [diskCount, gameNew, rowHeight])


    const newgame = () => {

        // mover.current = null;
        // debugger
        dispatch({ type: Actions.GAMENEW })
        //forceUpdate()

    }

    const go = () => {
        mover.current.currMove = 0;
        mover.current.start();//.go();///start();
    }

    const pause = () => {
        if (!mover.current.isPause) {
            mover.current.pause()
        }
        else {
            mover.current.pause()

            mover.current.continue()
        }
    }

    // useEffect(() => {

    //     console.log('Layout', rootRef.current, board_Ref.current);
    //     let brd = Object.values(rootRef.current.children).filter(d => d.className.includes('board'))[0];
    //     brd.zzz = false
    //     // let disks=  Object.values(brd.children).filter(d=>d.className.includes('disk'))

    //     const mvr = new Mover(brd, -5, dispatch);
    //     mover.current = mvr;
    //     // debugger
    //     mover.current.start();

    // }, [])// [state.gameNew])


    return (
        <GameContext.Provider value={dispatch}>
            <div ref={rootRef} className='game'>
                <Controls
                    newgame={newgame}
                    go={go}
                    pause={pause}
                    {...state}
                />
                <DndProvider backend={Backend}>
                    {mBoard}
                    {/* <Board diskCount={state.diskCount} /> */}
                </DndProvider>
            </div>
        </GameContext.Provider>
    )
}

export { GameLayout, GameContext }