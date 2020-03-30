import React, { useCallback, useContext, useState } from 'react'
import { useDrag } from 'react-dnd';
import { GameContext } from './gameProvider'

function useDisk() {
    const { state, dispatch } = useContext(GameContext);
    const [diskRefs, setDiskRef] = useState(new Array(Object.values(state.disks).length).fill("-"));


    const testRef = useCallback((node, idx) => {
        if (node) {
            // if (state.boardRef) {
            //console.log('testRef', idx, state, node)
            Object.values(state.disks)[idx].ref = node
            if (diskRefs) {
                //  setDiskRef(diskRefs[idx] = node)/////(s) => { console.log("SSS", s); s[idx] = node })

            }

            // }

        }
    }, [state.disks])

    return [testRef]
}



export { useDrag, useDisk }