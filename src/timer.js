import React, { useEffect, useState } from 'react'
import { timerStyles } from './styles'

const Timer = (props) => {
    const classes = timerStyles(props)
    const [sec, setTime] = useState(0);

    useEffect(() => {
        if (props.moveCount === 0) {
            setTime(0)
        }

        const id = setInterval(() => {
            if (props.gameStarted && !props.gameOver && !props.gamePaused)
                setTime(s => s + 1);
        }, 1000);

        return () => {
            clearInterval(id)
        };
    }, [props.gamePaused, props.gameOver, props.gameStarted])

    return (
        <table className={classes.timer}>
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
                            className={classes.gameOver}>
                            Game over
                        </td>
                    </tr>}
            </tbody>
        </table>
    )
}
export default Timer