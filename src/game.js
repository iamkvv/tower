import React, { Component, useCallback } from 'react'
import Board from './board'
//import chroma from 'chroma-js'
import anime from 'animejs/lib/anime.es.js'
import { buildMoves, createDisks } from './helper'
////////////
//import { ItemTypes } from './dndTypes';
//import { useDrag } from 'react-dnd';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'


//https://animejs.com/documentation/#cubicBezier
//https://gka.github.io/chroma.js/
//https://getinstance.info/articles/react/react-and-es6-part3/
//!! https://tproger.ru/articles/10-js-conception-for-react/

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pause: false,
            disksCount: 2,
            disks: createDisks(2)// [{ idx: 0, color: chroma.random(), rowStart: 1, colStart: 1, rowEnd: 2, colEnd: 2 }]
        }
        // this.diskRefs = null;
        // this.boardRef = null;
    }

    diskRefs = null;
    boardRef = null;

    componentDidMount() {//странность, к-я нужна для получения disksRefs
        const disksData = createDisks(3);
        this.setState({ disksCount: 3, disks: disksData })
    }

    getRefs = (boardRef, diskRefs) => {
        this.diskRefs = diskRefs;
        this.boardRef = boardRef;
        //debugger
    }

    onDisksChange = (e) => {
        const val = e.target.value;
        const disksData = createDisks(val);

        this.setState({ disksCount: val, disks: disksData })
    }

    startGame = () => {
        const allMoves = buildMoves(this.state.disks.length)///rows);//заменить на state.disks.length
        // debugger
        let run = this.doMoves(allMoves);
        run();
    }

    doMoves = (moves) => {
        var curr = 0;
        var self = this;
        function callback() {
            if (curr < moves.length && !self.state.pause) {
                // self.Move(moves[curr++], callback);
                self.changePlace(moves[curr++], callback)
            }
        }
        return callback;
    }

    changePlace = (move, cb) => {
        let self = this;

        let diskCount_ColTo = this.state.disks.filter(d => d.colStart === move.to).length; //кол-во дисков на стобце-адресате
        let newNumRow = this.state.disks.length == 1 ? 1 : this.state.disks.length - diskCount_ColTo //- 1; //номер строки нового адреса

        let newLeft = (move.to - move.from) * (this.boardRef.offsetWidth / 3) //Left Top координаты
        let newTop = (newNumRow - this.state.disks[move.disk - 1].rowStart) * 30// * newNumRow//top нового адреса

        anime({
            targets: this.diskRefs[move.disk - 1],
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

                let disksClone = JSON.parse(JSON.stringify(self.state.disks))
                let currDisk = disksClone[move.disk - 1]

                currDisk.rowStart = newNumRow;
                currDisk.colStart = move.to;
                currDisk.rowEnd = newNumRow + 1;
                currDisk.colEnd = move.to + 1

                self.setState({ disks: disksClone })

                this.animatables[0].target.style.top = 0;
                this.animatables[0].target.style.left = 0;

                cb();
            }
        });
    }

    changePlaceOndrop = (result) => {
        if (!result) return;
        //Знать, какому диску (по idx) и на что изменить gridArea
        //{dropEffect: "move", dropRow: 3, dropCol: 2, sourceIdx: 0}
        //console.log("changePlaceOndrop", result)

        //setState сделать одну функцию для D&D и anime
        let disksClone = JSON.parse(JSON.stringify(this.state.disks))
        let currDisk = disksClone[result.sourceIdx]

        currDisk.rowStart = result.dropRow;
        currDisk.colStart = result.dropCol;
        currDisk.rowEnd = result.dropRow + 1;
        currDisk.colEnd = result.dropCol + 1

        this.setState({ disks: disksClone })
    }

    onPause = (e) => {
        this.setState({ pause: true })
    }
    onContinue = (e) => {
        this.setState({ pause: false })
    }
    render() {
        return (
            <div>
                <button onClick={(e) => this.startGame(e)}>StartGame</button>
                <button onClick={(e) => this.onPause(e)}>Pause</button>
                <button onClick={(e) => this.onContinue(e)}>Continue</button>

                <input type="range" min="1" max="10"
                    value={this.state.disksCount}
                    onChange={(e => this.onDisksChange(e))}
                />

                <DndProvider backend={Backend}>
                    <Board
                        disks={this.state.disks}
                        getRefs={this.getRefs}
                        changePlaceOndrop={this.changePlaceOndrop} />
                </DndProvider>
            </div>
        )
    }
}

export default Game
