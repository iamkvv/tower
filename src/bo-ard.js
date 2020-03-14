import React, { useContext, useCallback } from 'react'
import { BoardContext } from './boardProvider'
import { renderDropCells, renderDisks } from './helper'
//import DropCell from './dropCell'
//import Disk from './disk'
import './App.css'



// const renderDropCells1 = (diskCount) => {//?to helper
//     let r, c = 0;
//     return new Array(diskCount * 3)
//         .fill(null, 0, diskCount * 3)
//         .map((d, i) => {
//             if (!(i % (diskCount))) { r = 0; c++; } r++
//             return (
//                 <DropCell
//                     key={'c' + i}
//                     row={r}
//                     col={c} />)
//         })
// }

const Board = () => {
    const { state, dispatch } = useContext(BoardContext);
    const { disks } = state;

    const boardRef = useCallback(node => {
        if (node) {
            dispatch({ type: 'BOARD-REF', boardref: node })
        }
    }, [])



    // const renderDisks1 = (disks) => {
    //     return disks.map(e => (
    //         <Disk color={e.color}
    //             width={e.width}
    //             gridArea={`${e.rowStart}/${e.colStart}/${e.rowEnd}/${e.colEnd}`}
    //             idx={e.idx}
    //             key={'d' + e.idx}
    //             changePlaceOndrop={changePlaceOndrop}
    //             setDnDrefs={setDnDrefs}
    //         />
    //     ))
    // }

    // const changePlaceOndrop = (result) => {//перенести в disk???
    //     if (!result) return;
    //     console.log("result??", disks, result);

    //     let currDisk = disks[result.sourceIdx]
    //     currDisk.rowStart = result.dropRow;
    //     currDisk.colStart = result.dropCol;
    //     currDisk.rowEnd = result.dropRow + 1;
    //     currDisk.colEnd = result.dropCol + 1

    //     dispatch({ type: 'change', arr: disks })// Исправить имена
    // }

    // const setDnDrefs = (ref_d, idx) => {
    //     disks[idx]['ref'] = ref_d
    //     console.log("setDnDrefs", ref_d, idx)
    // }

    return (
        <div className='board'
            ref={boardRef}
            style={{
                height: `${30 * Object.keys(disks).length}px`,
                gridTemplateRows: `repeat(${Object.keys(disks).length}, ${30}px` //30 в state
            }}
        >
            {renderDropCells(Object.keys(disks).length)}
            {renderDisks(disks)}

            {/* {
                Object.keys(disks).map(id => (
                    <Disk color={disks[id].color}
                        width={disks[id].width}
                        gridArea={`${disks[id].rowStart}/${disks[id].colStart}/${disks[id].rowEnd}/${disks[id].colEnd}`}
                        idx={disks[id].idx}
                        key={'d' + disks[id].idx}
                    // changePlaceOndrop={changePlaceOndrop}
                    />
                ))
            } */}
        </div>
    )
}

export default Board