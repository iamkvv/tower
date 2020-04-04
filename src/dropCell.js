import React, { useRef, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { ItemTypes } from './constants';
import { useDrop } from 'react-dnd'

//import { GameContext } from './gameLayout'

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
    //  const { boardRef } = state;

    // const parentRef = useRef();
    // const currentRef = useRef();

    function createRefs(ref) {
        const targetRef = useRef();

        useEffect(() => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(targetRef.current);

                /*
                parentRef.current = Object.values(
                    targetRef.current
                        .parentNode.children)
                    .filter(d => d.className.includes('disk'))
                    .map(s => getComputedStyle(s));
*/
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
            // //     let disksInCol = parentRef.current.filter(d => parseInt(d.gridArea.split('/')[1]) === props.col)
            // let allDisks = Object.values(boardRef.children).filter(d => d.className.includes('disk'))
            // let disksInCurrCol = allDisks.filter(d => d.style.gridColumnStart == props.col);

            let disksInCurrCol = props.board().filter(d => parseInt(d.gridColumnStart) === props.col);//кол-во дисков в столбце этой dropCell,
            // console.log('canDrop_1', disksInCurrCol, props.col);
            //debugger
            if (disksInCurrCol.length == 0) {
                // if ((Object.values(boardRef.children).length - disksInCurrCol.length - props.row == 0)) {//строка последняя?
                //if (allDisks.length === props.row)
                if (props.board().length === props.row)//нижняя строка
                    return true
            } else {
                //if (allDisks.length - disksInCurrCol.length === props.row)
                //   return true
                // let minWidthInCol = Math.min(...disksInCurrCol.map(d => parseInt(getComputedStyle(d).maxWidth)))

                let minWidthInCol = Math.min(...disksInCurrCol.map(d => parseInt(d.width)))
                // console.log('canDrop_2', disksInCurrCol, parseInt(item.width))
                //debugger
                //if (parseInt(item.width) < minWidthInCol && props.board.length - disksInCurrCol.length - props.row === 0)
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
    const classes = useStyles(styleData);

    return (
        <div ref={dropRef}//{createRefs(dropRef)}
            className={classes.dropcell} />
    )
}

export default DropCell