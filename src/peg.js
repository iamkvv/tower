import React, { useContext, useEffect } from 'react'
import { GameContext } from './gameProvider'


const Peg = (props) => {
    const { state, dispatch } = useContext(GameContext);
    const { disks, rowHeight, boardRef } = state;



    return (
        <div className='peg'
            style={{
                display: !boardRef ? 'none' : 'block',
                height: !boardRef ? 0 : boardRef.offsetHeight + 5,
                left: !boardRef ? 0 : 100 * (props.k / 6) + '%'
            }}

        >
        </div >
    )

}

export default Peg
