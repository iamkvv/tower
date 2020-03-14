import React from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { BoardProvider } from './boardProvider'

//https://animejs.com/documentation/#cubicBezier
//https://gka.github.io/chroma.js/
//https://getinstance.info/articles/react/react-and-es6-part3/
//!! https://tproger.ru/articles/10-js-conception-for-react/

function Game() {
    return (
        <div>
            <DndProvider backend={Backend}>

                <BoardProvider />

            </DndProvider>
        </div>
    )
}

export default Game
