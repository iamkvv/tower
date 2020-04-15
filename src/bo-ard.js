import React, { forwardRef, useEffect } from 'react'
import { boardStyles } from './styles'
import { renderDropCells, renderDisks, renderPegs } from './helper'

function Board(props, ref) {
    const styleData = { diskCount: props.diskCount, rowHeight: props.rowHeight }
    const classes = boardStyles(styleData)

    useEffect(() => {
        if (!ref.current) return

        if (props.mode === 'auto')
            props.createMover()
    }, [props.diskCount, props.gameNew, props.mode])

    const boardRef = () => {
        return Object.values(ref.current.children).filter(d => d.dataset.disk === 'true')//  d.className.includes('disk'))
            .map(s => getComputedStyle(s));
    }

    return (
        <div className={classes.board}
            ref={ref}>
            {
                renderDropCells(props.diskCount, () => boardRef())
            }
            {
                renderDisks(
                    props.diskCount,
                    props.mode,
                    () => boardRef(),
                )
            }
            {
                renderPegs()
            }
        </div>
    )
}

Board = forwardRef(Board)
export default Board