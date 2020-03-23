import React from 'react'

import DropCell from './dropCell'
import Disk from './disk'
import Peg from './peg'

import chroma from 'chroma-js'

// const dropCellStyle = makeStyles({
//     ddcell: {
//         gridArea: data => (`${data.row}/${data.col}/${data.row + 1}/${data.col + 1}`),
//         width: '100%',
//         height: '100%',
//     }
// })


export const createDisks = (qnt) => {
    let disksData = [];
    let diskObj = {};
    // let colors = chroma.scale(['blue', 'yellow', 'violet', 'darkmagenta'])
    let colors = chroma.scale([chroma.random(), 'yellow', 'violet', chroma.random()])
        .mode('lch').colors(qnt);

    let w = 10;
    for (let i = 0; i < qnt; i++) {

        w = w + (85 / qnt) //установка ширины диска
        /*
        disksData.push({
            idx: i,
            width: w + '%',
            color: colors[i],
            rowStart: i + 1,
            colStart: 1,
            rowEnd: i + 2,
            colEnd: 2
        })
        */
        diskObj[i] = {
            idx: i,
            width: w + '%',
            color: colors[i],
            rowStart: i + 1,
            colStart: 1,
            rowEnd: i + 2,
            colEnd: 2,
            ref: null
        }

    }
    return diskObj //disksData;
}

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

export const renderDropCells = (diskCount) => {
    let r, c = 0;
    return new Array(diskCount * 3)
        .fill(null, 0, diskCount * 3)
        .map((d, i) => {
            if (!(i % (diskCount))) { r = 0; c++; } r++
            return (
                <DropCell
                    // className={ddStyle.ddcell}
                    key={'c' + i}
                    row={r}
                    col={c} />)
        })
}

export const renderDisks = (disks) => {
    return Object.keys(disks).map(id => (
        <Disk color={disks[id].color}
            width={disks[id].width}
            gridArea={`${disks[id].rowStart}/${disks[id].colStart}/${disks[id].rowEnd}/${disks[id].colEnd}`}
            idx={disks[id].idx}
            key={'d' + disks[id].idx}
        />
    ))
}

export const renderPegs = () => {
    let k = 1; let arr = ['A', 'B', 'C']
    // return new Array(3) как затащить БУКВУ в :before ???
    //   .fill(null, 0, 3)
    return arr.map((d, i) => {
        return (<Peg l={arr[i]} k={(k * i * 2) + 1} />)
    })
}
