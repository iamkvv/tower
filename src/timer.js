import React, { useEffect, useState } from 'react'
const Timer = (props) => {
    console.log('Timer', props)
    const [sec, setTime] = useState(0);

    useEffect(() => {
        console.log('props.moveCount', props.moveCount)
        if (props.moveCount === 0) {
            setTime(0)
        }

        const id = setInterval(() => {
            if (props.gameStarted && !props.gameOver && !props.gamePaused)
                setTime(s => s + 1);
        }, 1000);

        return () => {
            console.log('clearInterval')
            clearInterval(id)
        };
    }, [props.gamePaused, props.gameOver, props.gameStarted]) //props.gameNew,

    //Игра закончена - лишних ходов нет (3)

    return (

        <table style={{ color: ' #328291', margin: '0 auto' }}>
            <tbody>
                <tr>
                    <td>Moves:</td>
                    <td>{props.moveCount} from {`${2 ** props.diskCount - 1}`}</td>
                </tr>
                <tr>
                    <td>Time:</td>
                    <td>{new Date(sec * 1000).toISOString().substr(14, 5)}</td>
                </tr>
                {props.gameOver &&
                    <tr>
                        <td colSpan='2'
                            style={{
                                backgroundColor: '#fff', color: '#ff5722', borderTop: '1px solid red',
                                padding: 5, letterSpacing: 5, fontSize: '18px'
                            }}>
                            Game over
                        </td>
                    </tr>}
            </tbody>
        </table>

    )
}
export default Timer