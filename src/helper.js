import React from 'react'
import chroma from 'chroma-js'
import DropCell from './dropCell'
import Disk from './disk'
import Peg from './peg'

export const buildMoves = (k) => { //строит массив ходов для заданного кол-ва дисков
    const hanoi = (n, a, b, c) => {
        return n ? hanoi(n - 1, a, c, b)
            .concat(
                [
                    [n, a, b]
                ]
            )
            .concat(hanoi(n - 1, c, b, a)) : [];
    }

    return hanoi(k, 1, 2, 3)
        .map(d => ({ disk: parseInt(d[0]), from: d[1], to: d[2] }))
};


let antimemo = 0;
export const renderDisks = (qnt, board, mode, gameover) => {
    let disksData = [];
    // let colors = chroma.scale(['blue', 'yellow', 'violet', 'darkmagenta']).mode('lch').colors(qnt);
    let colors = chroma.scale([chroma.random(), 'yellow', 'violet', chroma.random()])
        .mode('lch')
        .colors(qnt);

    let w = 10;
    for (let i = 0; i < qnt; i++) {
        w = w + (85 / qnt) //установка ширины диска
        disksData.push(
            <Disk color={colors[i]}
                antimemo={antimemo++}
                width={w}
                gridArea={`${i + 1}/1/${i + 2}/2`}
                idx={i}
                key={'d' + i + antimemo}
                board={board}
                mode={mode}
                gameover={gameover}
            />
        )
    }
    return disksData;
}

export const renderDropCells = (diskCount, board) => {
    let r, c = 0;
    return new Array(diskCount * 3)
        .fill(null, 0, diskCount * 3)
        .map((d, i) => {
            if (!(i % (diskCount))) { r = 0; c++; } r++
            return (
                <DropCell
                    key={'c' + i}
                    row={r}
                    col={c}
                    board={board}
                />)
        })
}


export const renderPegs = () => {
    let pegNames = ['A', 'B', 'C']
    return pegNames.map((d, i) => {
        return (<Peg key={'p_' + i} l={pegNames[i]} k={(i * 2) + 1} />)
    })
}

// export const renderDisks = (disks) => {
//     return Object.keys(disks).map(id => (
//         <Disk color={disks[id].color}
//             width={disks[id].width}
//             gridArea={`${disks[id].rowStart}/${disks[id].colStart}/${disks[id].rowEnd}/${disks[id].colEnd}`}
//             idx={disks[id].idx}
//             key={'d' + disks[id].idx}
//         />
//     ))
// }

// const dropCellStyle = makeStyles({
//     ddcell: {
//         gridArea: data => (`${data.row}/${data.col}/${data.row + 1}/${data.col + 1}`),
//         width: '100%',
//         height: '100%',
//     }
// })
