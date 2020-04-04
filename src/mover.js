import { buildMoves } from './helper'
import { Actions } from './constants'


function Mover(boardRef, diskCount, disp) {
    this.boardRef = boardRef;
    // this.diskCount = diskCount;
    this.isPause = false;
    this.currMove = 0;
    this.onPauseMove = -1;
    this.continue = null
    this.go = null

    let diskRefs = null;

    const qqq = function (n, e) {
        console.log(arguments)
        // debugger
        this.handle(arguments[1], arguments[0])
    }


    const ddd = (e, n) => {
        // debugger
        //this.handle(n, next)
        this.test(n, e)
    }

    function wrap(n) {
        function zz(e) {
            test(e, n)
        }
        return zz
    }

    let cache = null

    this.start = function () {
        //https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b
        // diskRefs = Object.values(this.boardRef.children).filter(d => d.className.includes('disk'))
        diskRefs = Object.values(boardRef.children).filter(d => d.className.includes('disk'))
        const allMoves = buildMoves(diskRefs.length);//    (this.diskCount);

        let next = doMoves(allMoves);//   .call(this, allMoves);

        cache = wrap(next)

        // boardRef.removeEventListener('transitionend', (e, n) => ddd(e, next), false)
        //debugger
        if (!boardRef.zzz) {
            boardRef.addEventListener('transitionend', cache) //wrap(next))   //function xxx(e, n) { ddd(e, next) })// (e, n) => qqq.call(this, next, e))
            // debugger
            //  boardRef.removeEventListener('transitionend', x) //wrap(next))    //function zz(e, n) { ddd(next, e) })   // function xxx(e, n) { ddd(e, next) })
            // debugger

        }




        this.continue = next;

        this.go = next;
        next();
    }

    this.pause = function () {
        // this.onPauseMove = this.currMove
        this.isPause = !this.isPause
    }

    const doMoves = (moves) => {
        let curr = 0;

        let self = this;
        function callback() {
            if (self.currMove < moves.length) {
                // if (curr < moves.length) {
                changeDiskPlace(moves[self.currMove++])//, callback);
            }
        }
        return callback;
    }

    const changeDiskPlace = (move) => {
        let currDiskRef = diskRefs[move.disk - 1]; //ref текущего диска

        let diskCount_ColTo = diskRefs.filter(s => parseInt(s.style.gridColumnStart) === move.to).length //кол-во дисков на целевом столбце
        let newNumRow = diskRefs.length - diskCount_ColTo //номер целевой строки

        let newLeft = (move.to - move.from) * (parseInt(getComputedStyle(boardRef).width) / 3) //целевые Left,Top координаты
        let newTop = (newNumRow - diskRefs[move.disk - 1].style.gridRowStart) * 30

        currDiskRef.style.zIndex = isNaN(parseInt(currDiskRef.style.zIndex)) ? 5
            : parseInt(currDiskRef.style.zIndex) + 1

        currDiskRef.dataset.rowStart = newNumRow;
        currDiskRef.dataset.colStart = move.to
        currDiskRef.dataset.rowEnd = newNumRow + 1;
        currDiskRef.dataset.colEnd = move.to + 1

        currDiskRef.style.transition = 'transform 1s ease-out'
        currDiskRef.style.transform = `translate(${newLeft}px,${newTop}px)`
    }

    const handleTransitionEnd = (e, next, self) => {
        e.target.style.transition = 'none'
        e.target.style.transform = 'initial'

        e.target.style.gridArea = `${e.target.dataset.rowStart}` +
            `/${e.target.dataset.colStart}` +
            `/${e.target.dataset.rowEnd}` +
            `/${e.target.dataset.colEnd}`

        console.log('mover before dispatch')
        disp({ type: Actions.DISKMOVED });

        if (!self.isPause) {
            next();
        }
    }

    /*this.test =*/ function test(e, next) {

        e.target.style.transition = 'none'
        e.target.style.transform = 'initial'

        e.target.style.gridArea = `${e.target.dataset.rowStart}` +
            `/${e.target.dataset.colStart}` +
            `/${e.target.dataset.rowEnd}` +
            `/${e.target.dataset.colEnd}`

        disp({ type: Actions.DISKMOVED });

        let in2col = Object.values(boardRef.children).filter(d => d.className.includes('disk') &&
            d.style.gridColumnStart == 2).length

        let disks = Object.values(boardRef.children).filter(d => d.className.includes('disk')).length
        console.log('in2Col', in2col, disks)
        //OK!!!
        if (in2col >= disks) {
            // let x = wrap(next)
            //  alert(9)
            boardRef.removeEventListener('transitionend', cache)
            // debugger
        } else {
            //  if (!this.isPause) {
            next()//.go() //next();
            //  }
        }
    }

}

export default Mover