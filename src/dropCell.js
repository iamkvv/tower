import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { ItemTypes } from './constants';
import { useDrop } from 'react-dnd'

//import { GameContext } from './gameProvider'

const useStyles = makeStyles({
    dropcell: props => ({
        width: '100%',
        height: '100%',
        gridArea: `${props.row}/${props.col}/${props.row + 1}/${props.col + 1}`,
        backgroundColor: props.isover ? '#aaffcc' : 'aqua',
    })
})

function DropCell(props) {
    // const { state } = useContext(GameContext);
    // const { disks } = state;

    const parentRef = useRef();
    // const currentRef = useRef();

    function createRefs(ref) {
        const targetRef = useRef();

        useEffect(() => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(targetRef.current);

                parentRef.current = Object.values(
                    targetRef.current
                        .parentNode.children)
                    .filter(d => d.className.includes('disk'))
                    .map(s => getComputedStyle(s));

            }
        })//, [ref]);

        return targetRef;
    };

    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.DISK,

        drop: (item, monitor) => {
            return { dropRow: props.row, dropCol: props.col, sourceIdx: monitor.getItem().idx }
        },

        canDrop: (item, monitor) => {

            let disksInCol = parentRef.current.filter(d => parseInt(d.gridArea.split('/')[1]) === props.col)

            if (disksInCol.length == 0) {
                if ((parentRef.current.length - disksInCol.length - props.row == 0)) {//строка последняя?
                    return true
                }
            } else {
                let minWidthInCol = Math.min(...disksInCol.map(d => parseInt(d.maxWidth)))
                if (parseInt(item.width) < minWidthInCol && parentRef.current.length - disksInCol.length - props.row === 0) {
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

    const styleData = { row: props.row, col: props.col, isover: isOver }
    const classes = useStyles(styleData);

    return (
        <div ref={createRefs(dropRef)}
            className={classes.dropcell} />
    )
}

export default DropCell