import React, { useRef, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { ItemTypes, Actions } from './constants';

import { useDrag } from 'react-dnd';
import { GameContext } from './gameLayout'

const useStyles = makeStyles({
    disk: props => ({
        position: 'relative',
        height: '94%',
        border: '1px solid silver',
        borderRadius: 5,
        zIndex: 5,
        backgroundColor: props.color,
        width: props.width + '%',
        minWidth: props.width + '%',
        maxWidth: props.width + '%',
        // gridArea: props.gridArea,
    })
})

const Disk = (props) => {
    const dispatch = useContext(GameContext);

    const classes = useStyles(props);
    const parentRef = useRef();
    const currentRef = useRef();

    //https://github.com/facebook/react/issues/13029
    function useCombinedRefs(...refs) {
        const targetRef = useRef();

        useEffect(() => { //убрать цикл
            refs.forEach(ref => {
                if (!ref) return;

                if (typeof ref === 'function') {
                    ref(targetRef.current);

                    currentRef.current = targetRef.current;//??

                    parentRef.current = Object.values(
                        targetRef.current
                            .parentNode.children)
                        .filter(d => d.className.includes('disk'))
                        .map(s => getComputedStyle(s));

                } else {
                    ref.current = targetRef.current;
                }
            });
        }, [refs]);

        return targetRef;
    }

    const [{ }, dragRef] = useDrag({
        item: {
            type: ItemTypes.DISK,
            gridArea: props.gridArea, //зачем??
            width: props.width,
            idx: props.idx,
        },
        canDrag: (item, monitor) => {
            let currCol = getComputedStyle(currentRef.current).gridColumnStart;  //Номер колонки (colStart) перемещаемого диска
            //?? использовать минимальную rowStart!!
            let disksInCurrCol = parentRef.current.filter(d => d.gridColumnStart == currCol);  //массив дисков в колонке перемещаемого диска
            let minWidthInCol = Math.min(...disksInCurrCol.map(d => parseInt(d.width))) // минимальная ширина диска в этой колонке
            //если ширина перемещаемого диска минимальна, то разрешаем Drag
            if (parseInt(getComputedStyle(currentRef.current).width) === minWidthInCol) return true
        },
        end: (item, monitor) => {
            //получаем {dropEffect: "move", dropRow: 3, dropCol: 2, sourceIdx: 0} т.е. на что изменить и кому
            let result = monitor.getDropResult()
            if (result) {
                dispatch({ type: Actions.DISKMOVED });

                currentRef.current.style.gridArea = `${result.dropRow}` +
                    `/${result.dropCol}` +
                    `/${result.dropRow + 1}` +
                    `/${result.dropCol + 1}`

                if (parentRef.current.filter(d => parseInt(d.gridColumnStart) === 2).length === parentRef.current.length) {
                    alert('all')
                }

                // определить конец игры
            }
        }
    })

    return (
        <div ref={useCombinedRefs(dragRef)}
            className={classes.disk}
            style={{ gridArea: props.gridArea }}
        >
            {props.idx}
        </div>
    )
}

export default Disk