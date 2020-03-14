import React, { useRef, useEffect, useReducer, useState } from 'react'
import anime from 'animejs/lib/anime.es.js'
import { buildMoves, createDisks } from './helper'
import Controls from './controls'
import Disk from './disk'
import DropCell from './dropCell'

import './App.css'

const BoardContext = React.createContext();


function reducer(state, action) {
    switch (action.type) {
        case 'change':
            // debugger
            return { disks: action.arr };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}
function init(cnt) {
    return { disks: createDisks(cnt) }
}


function NewBoard() {

    const boardRef = useRef(null);
    const [diskCount, setDiskCount] = useState(2)

    //let dsk = createDisks(3)
    // const [disks, setDisks] = useState(() => {
    //     return createDisks(3)
    // });
    // let [disks, setDisks] = useState(dsk)

    const [state, dispatch] = useReducer(reducer, 2, init);

    let diskRefs = {}

    const onDisksCountChange = (e) => {//на изменеие input Range
        const val = e.target.value;
        const disksData = createDisks(val);

        setDiskCount(val);
        setDisks(disksData)
    }

    ///
    const startGame = () => {
        const allMoves = buildMoves(diskCount);
        // debugger
        // return
        let one = { disk: 1, from: 1, to: 2 }
        let two = { disk: 2, from: 1, to: 3 }
        let three = { disk: 1, from: 2, to: 3 }
        changePlace(one);

        //  setTimeout(() => {
        changePlace(two);
        // }, 1000);
        // setTimeout(() => {
        changePlace(three);
        // }, 1000);

        return
        //changePlace(one)

        console.log("allMoves", allMoves);

        let run = doMoves(allMoves);
        run();
    }

    const doMoves = (moves) => {
        let curr = 0;

        function callback(tt) {
            if (curr < moves.length) {// !self.state.pause) {

                changePlace(moves[curr++], callback)
            }
        }
        return callback;
    }

    const changePlace = (move, cb) => {
        console.log("state.disks-- ", state.disks)
        //let diskCount_ColTo = this.state.disks.filter(d => d.colStart === move.to).length; //кол-во дисков на стобце-адресате
        let diskCount_ColTo = state.disks.filter(d => d.colStart === move.to).length;//кол-во дисков на целевом столбце
        //debugger
        // let newNumRow = this.state.disks.length == 1 ? 1 : this.state.disks.length - diskCount_ColTo //- 1; //номер строки нового адреса
        let newNumRow = state.disks.length == 1 ? 1 : state.disks.length - diskCount_ColTo

        let newLeft = (move.to - move.from) * (boardRef.current.offsetWidth / 3) //Left Top координаты
        let newTop = (newNumRow - state.disks[move.disk - 1].rowStart) * 30// * newNumRow//top нового адреса


        let pl = diskRefs[move.disk - 1].animate([
            { transform: 'translateY(0px)' },
            { transform: 'translateY(100px)' }
        ], 2800);
        //  debugger
        pl.onfinish = function () {
            //alert(99)
            let disksClone = JSON.parse(JSON.stringify(state.disks))
            let currDisk = disksClone[move.disk - 1] //disks.filter(d => d.idx == move.disk - 1)[0]//

            currDisk.rowStart = newNumRow;
            currDisk.colStart = move.to;
            currDisk.rowEnd = newNumRow + 1;
            currDisk.colEnd = move.to + 1

            dispatch({ type: 'change', arr: disksClone })

            // debugger
            //self.setState({ disks: disksClone })
            // setDisks(disksClone);//disks)
            // setTimeout(() => {
            // cb()
            // }, 0);
        }
        // setTimeout(() => {
        return
        //}, 100);
        anime({
            targets: diskRefs[move.disk - 1],
            left: newLeft,
            top: newTop,
            duration: 600,
            easing: 'cubicBezier(.5, .05, .9, .6)',

            // update: function (anim) {
            //     console.log(Math.round(anim.progress) + '%')
            // },

            begin: function (anim) {
                //beginLogEl.value = 'began : ' + anim.began;
                this.animatables[0].target.style.zIndex = parseInt(this.animatables[0].target.style.zIndex) + 1
                // debugger
                console.log('began : ' + anim.began);
            },
            complete: function (anim) {
                //completeLogEl.value = 'completed : ' + anim.completed;
                console.log('completed : ' + anim.completed)

                let disksClone = JSON.parse(JSON.stringify(state.disks))
                let currDisk = disksClone[move.disk - 1] //disks.filter(d => d.idx == move.disk - 1)[0]//

                currDisk.rowStart = newNumRow;
                currDisk.colStart = move.to;
                currDisk.rowEnd = newNumRow + 1;
                currDisk.colEnd = move.to + 1

                // debugger
                //self.setState({ disks: disksClone })
                // setDisks(disksClone);//disks)
                setTimeout(() => {
                    dispatch({ type: 'change', arr: disksClone })
                }, 0);


                // this.animatables[0].target.style.top = 0;
                //this.animatables[0].target.style.left = 0;

                diskRefs[move.disk - 1].style.top = 0;
                diskRefs[move.disk - 1].style.left = 0;
                console.log("disks", state.disks)
                // debugger
                // cb();
                //setTimeout(() => { cb() }, 1000);
            }
        });
    }

    ///

    const changePlaceOndrop = (result) => {
        if (!result) return;
        console.log("result??", state.disks, result);

        let disksClone = JSON.parse(JSON.stringify(state.disks))

        let currDisk = disksClone[result.sourceIdx]
        currDisk.rowStart = result.dropRow;
        currDisk.colStart = result.dropCol;
        currDisk.rowEnd = result.dropRow + 1;
        currDisk.colEnd = result.dropCol + 1

        // setDisks(disksClone)
        dispatch({ type: 'change', arr: disksClone })
    }

    const setDnDrefs = (ref_d, idx) => {

        diskRefs = Object.assign(diskRefs, { [idx]: ref_d });

        // console.log("setDnDrefs", ref_d, diskRefs)
    }

    let r, c = 0;

    return (
        <React.Fragment>
            <BoardContext.Provider value={{ state, dispatch }}>
                {diskCount}
                <div className='board'
                    ref={boardRef}
                    style={{
                        height: `${30 * diskCount}px`,
                        gridTemplateRows: `repeat(${diskCount}, ${30}px`
                    }}
                >
                    {
                        new Array(diskCount * 3)
                            .fill(null, 0, diskCount * 3)
                            .map((d, i) => {
                                if (!(i % (diskCount))) { r = 0; c++; } r++
                                return (
                                    <DropCell
                                        key={'c' + i}
                                        row={r}
                                        col={c} />)
                            })
                    }
                    {
                        state.disks.map(e => (
                            <Disk color={e.color}
                                width={e.width}
                                gridArea={`${e.rowStart}/${e.colStart}/${e.rowEnd}/${e.colEnd}`}
                                // disks={state.disks}
                                idx={e.idx}
                                key={'d' + e.idx}
                                changePlaceOndrop={changePlaceOndrop}
                                setDnDrefs={setDnDrefs}
                            />
                        ))
                    }
                </div>

                <Controls
                    disksCount={diskCount}
                    onDisksChange={onDisksCountChange}
                    startGame={startGame} />
            </BoardContext.Provider>
        </React.Fragment>
    )
}

export { NewBoard, BoardContext } //NewBoard