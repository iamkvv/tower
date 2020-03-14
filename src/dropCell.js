import React, { useContext } from 'react'
import { ItemTypes } from './dndTypes';
import { useDrop } from 'react-dnd'
import { BoardContext } from './boardProvider'

function DropCell({ row, col }) {//, disks }) {
    const { state, dispatch } = useContext(BoardContext);

    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.DISK,

        drop: (item, monitor) => {
            return { dropRow: row, dropCol: col, sourceIdx: monitor.getItem().idx }
        },

        canDrop: (item, monitor) => {
            let disksInCol = Object.values(state.disks).filter(d => d.colStart === col);

            if (disksInCol.length == 0) {
                if ((Object.values(state.disks).length - disksInCol.length - row == 0)) {
                    return true
                }
            } else {
                let minSizeDisk = Math.min(...disksInCol.map(d => d.idx))
                if ((item.idx < minSizeDisk) && (Object.values(state.disks).length - disksInCol.length - row == 0)) {
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