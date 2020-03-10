import React, { useRef, useEffect } from 'react'
import { ItemTypes } from './dndTypes';
import { useDrag, DragPreviewImage, useDragLayer } from 'react-dnd';
import './App.css'
import pagoda from './pvector.svg'

//function Disk({ color, width, gridArea, idx }) {

//https://github.com/facebook/react/issues/13029
function useCombinedRefs(...refs) {
    const targetRef = useRef();
    // debugger
    useEffect(() => {
        refs.forEach(ref => {
            if (!ref) return;
            if (typeof ref === 'function') {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    })//???зачем??, [refs]);

    return targetRef;
}

const Disk = React.forwardRef((props, ref) => {

    const [{ isDragging, opacity, color, height }, dragRef, preView] = useDrag({
        item: {
            type: ItemTypes.DISK,
            gridArea: props.gridArea, //зачем??
            idx: props.idx
        },
        canDrag: (monitor) => {
            let currCol = parseInt(props.gridArea.split('/')[1]);
            let disksInCurrCol = props.disks.filter(d => d.colStart == currCol);
            let minIdxInCol = Math.min(...disksInCurrCol.map(d => d.idx))

            if (props.idx === minIdxInCol) return true
        },

        end: (item, monitor) => {
            //получаем {dropEffect: "move", dropRow: 3, dropCol: 2, sourceIdx: 0} т.е. на что изменить и кому
            props.changePlaceOndrop(monitor.getDropResult()); //проверка!!!
            // console.log("dropResult", monitor.getDropResult());
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.95 : 0.91,
            color: monitor.isDragging() ? "red" : "blue",
            height: monitor.isDragging() ? "50px" : "20px",
            isDragging: !!monitor.isDragging() ? "qq" : "ww"
        }),
    })
    console.log('PreView', props, preView)

    return (
        <React.Fragment>
            {/* <DragPreviewImage connect={preView} src={pagoda} /> */}
            <div
                ref={useCombinedRefs(dragRef, ref)}
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
        </React.Fragment>
    )

})

export default Disk