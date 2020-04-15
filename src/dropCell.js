import React from 'react'
import { dropcellStyles } from './styles'
import { ItemTypes } from './constants';
import { useDrop } from 'react-dnd'

function DropCell(props) {
    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.DISK,

        drop: (item, monitor) => {
            return { dropRow: props.row, dropCol: props.col, sourceIdx: monitor.getItem().idx }
        },

        canDrop: (item, monitor) => {
            let disksInCurrCol = props.board().filter(d => parseInt(d.gridColumnStart) === props.col);//кол-во дисков в столбце этой dropCell,

            if (disksInCurrCol.length == 0) {
                if (props.board().length === props.row)//нижняя строка
                    return true
            } else {
                let minWidthInCol = Math.min(...disksInCurrCol.map(d => parseInt(d.width)))
                if (parseInt(props.board()[item.idx].width) < minWidthInCol && props.board().length - disksInCurrCol.length - props.row === 0)
                    return true
            }
        },

        collect: (monitor) => {
            return {
                isOver: !!monitor.canDrop()
            }
        }
    })

    const styleData = { row: props.row, col: props.col, isover: isOver }
    const classes = dropcellStyles(styleData);

    return (
        <div ref={dropRef}
            className={classes.dropcell} />
    )
}

export default DropCell