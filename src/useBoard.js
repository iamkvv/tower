import React, { useCallback, useRef, useContext, useEffect } from 'react'
import { GameContext } from './gameProvider'
import { Actions } from './constants'

function useBoard() {
    //const { state, dispatch } = useContext(GameContext);

    const Board_Ref = useRef();
    const testBoard = useCallback((node) => {
        console.log('BOARD???', Board_Ref, node);

        if (node) {

            Board_Ref.current = node
            console.log('BOARD!!', Board_Ref, node)
            // dispatch({ type: Actions.BOARDREF, boardref: node })
        }

    }, [])//, [state.disks]
    return [Board_Ref, testBoard]
}

export default useBoard;