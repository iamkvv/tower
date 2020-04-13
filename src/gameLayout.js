import React, { useReducer, useRef, useMemo, useCallback } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery';

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'


import { Actions } from './constants'
import Board from './bo-ard'
//import Controls from './controls'
import Mover from './mover'
import BlockScreen from './blockScreen'

import GameMenu from './gameMenu'

import './App.css'
import Footer from './footer';

const GameContext = React.createContext();

//!! https://html5book.ru/css3-transform/#transform


function reducer(state, action) {
    switch (action.type) {
        case Actions.DISKCOUNT:
            return Object.assign({}, state, { diskCount: action.diskcount, moveCount: 0 });

        case Actions.DISKMOVED:
            return Object.assign({}, state, { moveCount: state.moveCount + 1 });

        case Actions.CHANGEMODE:
            return Object.assign({}, state, {
                mode: action.mode,
                moveCount: 0,
                gameOver: false,
                gamePaused: false,
                gameStarted: false
            });

        case Actions.GAMEOVER:
            return Object.assign({}, state, { gameOver: true });

        case Actions.GAMESTARTED:
            return Object.assign({}, state, { gameOver: false, gamePaused: false, gameStarted: true });

        case Actions.GAMEPAUSED:
            return Object.assign({}, state, { gamePaused: !state.gamePaused });

        case Actions.GETMOVER:
            return Object.assign({}, state, { amover: action.mover });

        case Actions.GAMENEW:
            return Object.assign({}, state, { gameNew: !state.gameNew, diskCount: 2, moveCount: 0, gamePaused: false, gameStarted: false, gameOver: false });

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
        gameStarted: false,
        gamePaused: false,
        gameNew: false,
        amover: null
    }
}

const GameLayout = () => {
    const [state, dispatch] = useReducer(reducer, 2, init);
    const { diskCount, gameNew, rowHeight, mode, gameOver, gamePaused, gameStarted } = state;
    const board_Ref = useRef()

    const matches = useRef(useMediaQuery('(min-width:600px)'))

    const createMover = useCallback(
        () => {
            const mvr = new Mover(board_Ref.current, diskCount, rowHeight, dispatch)
            dispatch({ type: Actions.GETMOVER, mover: mvr })
        },
        [diskCount, gameNew]
    );

    const mBlockScreen = useMemo(() => <BlockScreen
        board={board_Ref}
        {...state}
    />, [board_Ref, gameOver, gameStarted, gamePaused, mode, diskCount])

    const mBoard = useMemo(() => <Board
        ref={board_Ref}
        createMover={createMover}
        diskCount={diskCount}
        mode={mode}
        rowHeight={rowHeight}
        started={gameStarted}
    />, [diskCount, gameNew, mode])

    const mGameMenu = useMemo(() => <GameMenu
        amover={state.amover}
        {...state}
    />)
    return (
        <GameContext.Provider value={dispatch}>
            <div className='game'>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyItems: 'center',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    gridArea: '1 /1/2/2',
                    //width: '100%',
                    textAlign: 'center',
                    fontFamily: 'Roboto',
                    fontSize: 40,
                    fontWeight: 100,
                    color: 'cadetblue'

                }}>
                    <div>Ханойская башня</div>
                    <div>
                        {mGameMenu}
                    </div>
                </div>

                <DndProvider backend={Backend}>
                    {mBoard}
                </DndProvider>

                {mBlockScreen}

                <Footer {...state} />

            </div>
        </GameContext.Provider>
    )
}

export { GameLayout, GameContext }



    // const changeMode = (mode) => {
    //     dispatch({ type: Actions.CHANGEMODE, mode: mode })
    // }

    // const go = () => {
    //     if (mode === 'auto')
    //         mover.current.start();
    // }

    // const pause = () => {
    //     if (mode === 'manual') return

    //     mover.current.pause()
    //     if (!mover.current.isPause) {
    //         mover.current.continue()
    //     }
    // }

    // const newGame = () => {
    //     if (mover.current)
    //         mover.current.clearEventHandler();

    //     dispatch({ type: Actions.GAMENEW })
    // }

