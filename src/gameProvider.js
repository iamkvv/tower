import React, { useReducer, useCallback, useEffect } from 'react'
import { Actions } from './constants'
import { createDisks } from './helper'
//import GameLayout from './gameLayout'

const GameContext = React.createContext();

function reducer(state, action) {
    switch (action.type) {
        case Actions.UPDATEDISK:
            return Object.assign({}, state, { disks: action.disks });

        case Actions.DISKCOUNT:
            return Object.assign({}, state, { disks: createDisks(action.count) });

        // case Actions.DISKREF:
        //     return Object.assign({}, state, state.diskRefs[action.diskref.idx] = action.diskref.ref);

        case Actions.BOARDREF:
            return Object.assign({}, state, { boardRef: action.boardref });

        case Actions.GAMEACTIVE:
            return Object.assign({}, state, { gameActive: true });

        case Actions.GAMESTOPPED:
            return Object.assign({}, state, { gameStopped: true, gameActive: false });

        case Actions.GAMENEW:
            return Object.assign({}, state, { gameNew: !state.gameNew, gameStopped: false, gameActive: false });

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
        disks: createDisks(diskcount),
        boardRef: null,
        rowHeight: 30,
        gameActive: false,
        gameStopped: false,
        gameNew: false,
        timer: false,
        startGame: null
    }
}

const GameProvider = () => {
    const [state, dispatch] = useReducer(reducer, 2, init);
    // const { disks, rowHeight, boardRef } = state;

    useEffect(() => {
        //dispatch({ type: 'TEST', boardref: 'node' })
        //     //  return () => {
        if (state.gameNew) {
            dispatch({ type: Actions.DISKCOUNT, count: Object.keys(state.disks).length })
        }

        //     // dispatch({ type: 'START-GAME', startGame: sg })
    }, [state.gameNew])//или []


    return (
        <GameContext.Provider value={{ state, dispatch }}>
            <GameLayout />
        </GameContext.Provider>
    )
}

export { GameProvider, GameContext }