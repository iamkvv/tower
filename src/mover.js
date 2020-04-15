import { buildMoves } from './helper'
import { Actions } from './constants'

function Mover(boardRef, diskCount, rowHeight, disp) {
    this.boardRef = boardRef;
    this.isPause = false;
    this.currMove = 0;
    this.onPauseMove = -1;

    this.continue = null

    this.clearEventHandler = () => {
        if (this.isPause) {
            this.boardRef.removeEventListener('transitionend', transHandler)
        }
    }

    let diskRefs = null;
    let transHandler = null

    function getTransHandler(nxt) {
        const transEnd = (e) => {
            e.target.style.transition = 'none'
            e.target.style.transform = 'initial'

            e.target.style.gridArea = `${e.target.dataset.rowStart}` +
                `/${e.target.dataset.colStart}` +
                `/${e.target.dataset.rowEnd}` +
                `/${e.target.dataset.colEnd}`

            disp({ type: Actions.DISKMOVED });

            let disksIn2Col = diskRefs.filter(d => parseInt(d.style.gridColumnStart) === 2).length;

            if (disksIn2Col >= diskCount) {
                this.boardRef.removeEventListener('transitionend', transHandler)
                disp({ type: Actions.GAMEOVER })
            } else {
                if (!this.isPause) {
                    nxt()
                }
            }
        }
        return transEnd
    }

    this.start = function () {
        this.currMove = 0

        //https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b
        diskRefs = Object.values(this.boardRef.children).filter(d => d.className.includes('disk'))

        const allMoves = buildMoves(diskCount)
        let next = doMoves(allMoves);

        transHandler = getTransHandler.call(this, next)

        // this.boardRef.removeEventListener('transitionend', transHandler) //???

        this.boardRef.addEventListener('transitionend', transHandler)
        this.continue = next;

        next();
    }

    this.pause = function () {
        this.isPause = !this.isPause
    }

    const doMoves = (moves) => {
        const callback = () => {
            if (this.currMove < moves.length) {
                changeDiskPlace(moves[this.currMove++])
            }
        }

        return callback;
    }

    const changeDiskPlace = (move) => {
        let currDiskRef = diskRefs[move.disk - 1]; //ref текущего диска

        let diskCount_ColTo = diskRefs.filter(s => parseInt(s.style.gridColumnStart) === move.to).length //кол-во дисков на целевом столбце
        let newNumRow = diskRefs.length - diskCount_ColTo //номер целевой строки

        let newLeft = (move.to - move.from) * (parseInt(getComputedStyle(this.boardRef).width) / 3) //целевые Left,Top координаты
        let newTop = (newNumRow - diskRefs[move.disk - 1].style.gridRowStart) * rowHeight

        currDiskRef.style.zIndex = isNaN(parseInt(currDiskRef.style.zIndex)) ? 5
            : parseInt(currDiskRef.style.zIndex) + 1

        //transitionend использует эти данные для перемешения диска в ячейку грида
        currDiskRef.dataset.rowStart = newNumRow;
        currDiskRef.dataset.colStart = move.to
        currDiskRef.dataset.rowEnd = newNumRow + 1;
        currDiskRef.dataset.colEnd = move.to + 1

        currDiskRef.style.transition = 'transform 1s ease-out'
        currDiskRef.style.transform = `translate(${newLeft}px,${newTop}px)`
    }
}

export default Mover