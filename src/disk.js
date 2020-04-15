import React, { useRef, useEffect, useContext } from 'react'
import { diskStyles } from './styles'
import { ItemTypes, Actions } from './constants';
import { useDrag } from 'react-dnd';
import { GameContext } from './gameLayout'

const Disk = (props) => {
    const dispatch = useContext(GameContext);
    const classes = diskStyles(props);

    const currentRef = useRef();
    //https://github.com/facebook/react/issues/13029
    function createRef(ref) {
        const targetRef = useRef();

        useEffect(() => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(targetRef.current);
                currentRef.current = targetRef.current;//??
            } else {
                ref.current = targetRef.current;
            }
        }, []);
        return targetRef;
    }

    const [{ }, dragRef] = useDrag({
        item: {
            type: ItemTypes.DISK,
            width: props.width,
            idx: props.idx,
        },

        canDrag: (item, monitor) => {
            let currCol = getComputedStyle(currentRef.current).gridColumnStart;  //Номер колонки перемещаемого диска
            let disksInCurrCol = props.board().filter(d => d.gridColumnStart === currCol);
            let minWidthInCol = Math.min(...disksInCurrCol.map(d => parseInt(d.width)))

            if (parseInt(getComputedStyle(currentRef.current).width) === minWidthInCol) return true;
            else
                return false
        },
        end: (item, monitor) => {
            //получаем {dropEffect: "move", dropRow: 3, dropCol: 2, sourceIdx: 0} т.е. на что изменить и кому
            let result = monitor.getDropResult()

            if (result) {
                currentRef.current.style.gridArea = `${result.dropRow}` +
                    `/${result.dropCol}` +
                    `/${result.dropRow + 1}` +
                    `/${result.dropCol + 1}`

                let disksIn_2Column = props.board().filter(d => parseInt(d.gridColumnStart) === 2)

                dispatch({ type: Actions.DISKMOVED });

                if (props.board().length === disksIn_2Column.length) {
                    dispatch({ type: Actions.GAMEOVER })
                }
            }
        }
    })

    return (
        <div ref={createRef(dragRef)}
            className={classes.disk}
            style={{ gridArea: props.gridArea }}
            data-disk={true}
        >
            {/* {props.idx} */}
        </div>
    )
}

export default Disk