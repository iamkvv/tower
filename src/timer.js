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
        <div>
            <table style={{ fontFamily: 'Roboto, sans-serif', margin: '0 auto' }}>
                <tbody>
                    <tr>
                        <td>Ходы:</td>
                        <td>{props.moveCount}</td>
                    </tr>
                    <tr>
                        <td>Время:</td>
                        <td>{new Date(sec * 1000).toISOString().substr(14, 5)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Timer