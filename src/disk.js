import React, { useRef, useEffect, useContext } from 'react'
import { ItemTypes, Actions } from './constants';
import { useDrag } from 'react-dnd';

//import { GameContext } from './hanoi-tower'
import { GameContext } from './gameProvider'

const Disk = (props) => {
    const { state, dispatch } = useContext(GameContext);
    const { disks } = state;

    //https://github.com/facebook/react/issues/13029
    function useCombinedRefs(ddref) {
        const diskRef = useRef();
        useEffect(() => {
            if (diskRef) {
                ddref(diskRef.current);
                Object.values(disks)[props.idx].ref = diskRef.current
            }
        })// ddref   ???зачем??, [refs]);
        return diskRef;
    }

    const [{ }, dragRef] = useDrag({
        item: {
            type: ItemTypes.DISK,
            gridArea: props.gridArea, //зачем??
            idx: props.idx
        },
        canDrag: (monitor) => {//idx диска д.б. минимальным с столбце
            let currCol = parseInt(props.gridArea.split('/')[1]);
            let disksInCurrCol = Object.values(disks).filter(d => d.colStart == currCol);
            let minIdxInCol = Math.min(...disksInCurrCol.map(d => d.idx))
            if (props.idx === minIdxInCol) return true
        },
        end: (item, monitor) => {
            //получаем {dropEffect: "move", dropRow: 3, dropCol: 2, sourceIdx: 0} т.е. на что изменить и кому
            let result = monitor.getDropResult()
            if (result) {
                let currDisk = disks[result.sourceIdx]//   result.sourceIdx]
                currDisk.rowStart = result.dropRow;
                currDisk.colStart = result.dropCol;
                currDisk.rowEnd = result.dropRow + 1;
                currDisk.colEnd = result.dropCol + 1

                dispatch({ type: Actions.UPDATEDISK, disks: disks })// Исправить имена
            }
        }
    })

    return (
        <div
            ref={useCombinedRefs(dragRef)}
            className='disk'
            style={{
                backgroundColor: props.color,
                width: props.width,
                gridArea: props.gridArea,
                zIndex: 5
            }}
        >
            {props.idx}
        </div>
    )
}

export default Disk