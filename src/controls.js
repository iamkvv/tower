import './App.css'
import React, { useContext } from 'react'
import { BoardContext } from './boardProvider'

const Controls = ({ startGame }) => {

    const { state, dispatch } = useContext(BoardContext);

    const onDiskCountChange = (e) => {
        const val = e.target.value;
        dispatch({ type: 'DISK-COUNT', count: val })
    }

    const onClickStart = () => {
        startGame();
    }

    const { disks } = state;

    return (
        <div className='controls'>
            {state.disks.length}
            <p>
                <input type="range" min="1" max="10"
                    value={Object.values(disks).length}
                    onChange={(e => onDiskCountChange(e))}
                />
            </p>
            <p>
                <button onClick={() => onClickStart()}>Start</button>
            </p>
            <p>
                <button>Stop</button>
            </p>
        </div>
    )
}

export default Controls