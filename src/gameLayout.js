import React, { useReducer, useRef, useMemo, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { reducer, init } from './reducer'
import { Actions } from './constants'
import { layoutStyles } from './styles'
import Header from './header'
import Board from './bo-ard'
import Mover from './mover'
import BlockScreen from './blockScreen'
import QuasiMenu from './quasiMenu'
import Footer from './footer';

const GameContext = React.createContext();

const GameLayout = () => {
    const [state, dispatch] = useReducer(reducer, 2, init)
    const classes = layoutStyles()
    const { diskCount, gameNew, rowHeight, mode, gameOver, gamePaused, gameStarted } = state
    const board_Ref = useRef()

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

    return (
        <GameContext.Provider value={dispatch}>
            <div className={classes.game}>
                <Header>
                    <QuasiMenu
                        amover={state.amover}
                        {...state} />
                </Header>

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