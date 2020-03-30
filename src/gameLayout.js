import React, { useReducer, forwardRef, useContext, useEffect, useRef, useLayoutEffect, useCallback, useMemo } from 'react'
//import anime from 'animejs/lib/anime.es.js'

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

//import { GameContext } from './gameProvider'
import { Actions } from './constants'
import { buildMoves } from './helper'
import Board from './bo-ard'

import HTBoard from './htboard'

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





        // case Actions.DISKREF:
        //     return Object.assign({}, state, state.diskRefs[action.diskref.idx] = action.diskref.ref);

        case Actions.BOARDREF:
            return Object.assign({}, state, { boardRef: action.boardref });

        case Actions.GAMESTARTED:
            return Object.assign({}, state, { gameStarted: !state.gameStarted });

        case Actions.GAMESTOPPED:
            return Object.assign({}, state, { gameStopped: true, gameActive: false });

        case Actions.GAMENEW:
            return Object.assign({}, state, { diskCount: 2, moveCount: 0 });

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
        gameStarted: false,
        gameStopped: false,
        gameNew: false,
        timer: false,
        startGame: null
    }
}

const GameLayout = () => {

    const [state, dispatch] = useReducer(reducer, 2, init);

    // const { state, dispatch } = useContext(GameContext);
    const { diskCount, rowHeight, gameStarted, boardRef } = state;

    const board_Ref = useRef()
    let diskRefs = null;

    const htBoard = useMemo(() => <HTBoard
        ref={board_Ref}
        diskCount={state.diskCount}
        rowHeight={state.rowHeight} />, [diskCount, rowHeight])


    /**
     *  Запуск в авто-режиме
     */
    useEffect(() => {
        if (!board_Ref.current) return

        if (gameStarted) {

            diskRefs = Object.values(board_Ref.current.children).filter(d => d.className.includes('disk'))
            const allMoves = buildMoves(diskCount);

            let next = doMoves(allMoves);
            board_Ref.current.addEventListener('transitionend', (e) => handleTransitionEnd(e, next))
            next();

        } else {
            diskRefs = null;
            board_Ref.current.removeEventListener('transitionend', (e) => handleTransitionEnd(e, state))
        }

        return () => {
            alert(77)//??
        };

    }, [gameStarted])

    const doMoves = (moves) => {
        let curr = 0;
        function callback() {
            if (curr < moves.length) {
                changeDiskPlace(moves[curr++])//, callback);
            }
        }
        return callback;
    }

    const changeDiskPlace = (move) => {
        let currDiskRef = diskRefs[move.disk - 1]; //ссылка на текущий диск

        let diskCount_ColTo = diskRefs.filter(s => parseInt(s.style.gridArea.split('/')[1]) === move.to).length
        let newNumRow = diskRefs.length - diskCount_ColTo //номер строки, на к-ю нужно переместить диск 

        let newLeft = (move.to - move.from) * (parseInt(getComputedStyle(board_Ref.current).width) / 3) //Left координаты
        let newTop = (newNumRow - diskRefs[move.disk - 1].style.gridArea.split('/')[0]) * rowHeight

        currDiskRef.style.zIndex = isNaN(parseInt(currDiskRef.style.zIndex)) ? 5 : parseInt(currDiskRef.style.zIndex) + 1
        // debugger
        currDiskRef.dataset.rowStart = newNumRow;
        currDiskRef.dataset.colStart = move.to
        currDiskRef.dataset.rowEnd = newNumRow + 1;
        currDiskRef.dataset.colEnd = move.to + 1

        currDiskRef.style.transition = 'transform 1s ease-out'
        currDiskRef.style.transform = `translate(${newLeft}px,${newTop}px)`
    }

    const handleTransitionEnd = (e, next) => {
        e.target.style.transition = 'none'
        e.target.style.transform = 'initial'

        e.target.style.gridArea = `${e.target.dataset.rowStart}` +
            `/${e.target.dataset.colStart}` +
            `/${e.target.dataset.rowEnd}` +
            `/${e.target.dataset.colEnd}`

        dispatch({ type: Actions.DISKMOVED });

        next();
    }

    return (
        <GameContext.Provider value={dispatch}>
            <div className='game'>
                <Controls {...state} />
                <DndProvider backend={Backend}>
                    {htBoard}
                </DndProvider>
            </div>
        </GameContext.Provider>
    )
}

export { GameLayout, GameContext }