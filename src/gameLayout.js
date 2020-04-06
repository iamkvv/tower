import React, { useReducer, useRef, useMemo, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { Actions } from './constants'
import Board from './bo-ard'
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

        case Actions.CHANGEMODE:
            return Object.assign({}, state, { mode: action.mode, moveCount: 0 });

        case Actions.GAMEOVER:
            return Object.assign({}, state, { gameOver: !state.gameOver });


        // case Actions.BOARDREF:
        //     return Object.assign({}, state, { boardRef: action.boardref });

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
            throw new Error();
    }
}

function init(diskcount) {
    return {
        diskCount: diskcount,
        mode: 'auto',
        moveCount: 0,
        gameOver: false,
        rowHeight: 30,

        // boardRef: null,
        gameStarted: false,
        gameStopped: false,
        gameNew: false,
        timer: false,
        startGame: null
    }
}

const GameLayout = () => {
    const [state, dispatch] = useReducer(reducer, 2, init);
    const { diskCount, gameNew, rowHeight, mode, gameOver } = state;
    const board_Ref = useRef()

    let mover = useRef(null);

    const createMover = useCallback(
        () => {
            const mvr = new Mover(board_Ref.current, diskCount, rowHeight, dispatch)
            mover.current = mvr
        },
        [diskCount, gameNew],
    );

    const mBoard = useMemo(() => <Board
        ref={board_Ref}
        createMover={createMover}
        //  getMover={getMover}  !!заменить на ...state
        diskCount={diskCount}
        mode={mode}
        gameOver={gameOver}
        gameNew={gameNew}
        rowHeight={rowHeight}
    />, [diskCount, gameNew, mode])


    const newgame = () => {
        dispatch({ type: Actions.GAMENEW })
    }

    const go = () => {
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

    return (
        <GameContext.Provider value={dispatch}>
            <div className='game'>
                <Controls
                    newgame={newgame}
                    go={go}
                    pause={pause}
                    {...state}
                />
                <DndProvider backend={Backend}>
                    {mBoard}
                </DndProvider>

                <div style={{ display: 'block', gridArea: '2/1/3/2', zIndex: 1000, opacity: 0.5, backgroundColor: '#fff', width: '100%', height: diskCount * rowHeight }}>
                    jhggj  jj
                </div>

            </div>
        </GameContext.Provider>
    )
}

export { GameLayout, GameContext }