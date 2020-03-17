import React, { useContext } from 'react'
import { ItemTypes } from './constants';
import { useDrop } from 'react-dnd'

//import { GameContext } from './hanoi-tower'
import { GameContext } from './gameProvider'

function DropCell({ row, col }) {
    const { state, dispatch } = useContext(GameContext);
    const { disks } = state;

    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.DISK,

        drop: (item, monitor) => {
            return { dropRow: row, dropCol: col, sourceIdx: monitor.getItem().idx }
        },

        canDrop: (item, monitor) => {
            let disksInCol = Object.values(disks).filter(d => d.colStart === col);

            if (disksInCol.length == 0) {
                if ((Object.values(disks).length - disksInCol.length - row == 0)) {
                    return true
                }
            } else {
                let minSizeDisk = Math.min(...disksInCol.map(d => d.idx))
                if ((item.idx < minSizeDisk) && (Object.values(disks).length - disksInCol.length - row == 0)) {
                    return true
                }
            }
        },

        collect: (monitor) => {
            return {
                isOver: !!monitor.canDrop()
            }
        }
    })

    return (
        <div ref={dropRef}
            className='drop-cell'
            style={{
                backgroundColor: isOver ? '#aaffcc' : 'aqua',
                gridArea: `${row}/${col}/${row + 1}/${col + 1}`
            }} />
    )
}

export default DropCell