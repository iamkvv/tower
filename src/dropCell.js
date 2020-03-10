import React from 'react'
import { ItemTypes } from './dndTypes';
import { useDrop } from 'react-dnd'


function testDrop(r, c) {
    console.log(r, c)
}


function DropCell({ row, col, disks }) {

    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.DISK,
        drop: (item, monitor) => {
            //нужно определить, не больше ли величина входящего диска нижележащего
            //для этого нужен массив всех дисков
            // testDrop(row, col);
            console.log("DropCell monitor.getItem ", monitor.getItem())
            return { dropRow: row, dropCol: col, sourceIdx: monitor.getItem().idx }
        },
        canDrop: (item, monitor) => {
            let disksInCol = disks.filter(d => d.colStart === col);

            if (disksInCol.length == 0) {
                if ((disks.length - disksInCol.length - row == 0)) {
                    return true
                }
            } else {
                let minSizeDisk = Math.min(...disksInCol.map(d => d.idx))
                if ((item.idx < minSizeDisk) && (disks.length - disksInCol.length - row == 0)) {
                    return true
                }
            }
        },

        collect: (monitor) => {
            //console.log('connect', monitor)
            //debugger
            return {
                isOver: !!monitor.canDrop()
            }//isOver() }
        }
    })

    return (
        <div ref={dropRef}
            style={{

                backgroundColor: isOver ? '#aaffcc' : 'aqua',
                gridArea:
                    `${row}/${col}/${row + 1}/${col + 1}`,
                width: '100%',
                height: '100%'
            }} />
    )
}

export default DropCell