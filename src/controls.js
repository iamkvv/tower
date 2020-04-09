import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import { Actions } from './constants'

import { GameContext } from './gameLayout' //'./gameProvider'
import Timer from './timer'


const useStyles = makeStyles({
    rt: {
        display: 'flex',
        flexDirection: 'column',
        gridArea: props => props.matches ? '2/2/3/3' : '1/1/2/2',
        backgroundColor: '#f8f8f8',
        width: 270,
        margin: '0 auto',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '0.8rem',
        '& label, & button': { fontSize: '0.7rem' },
        '& .MuiSvgIcon-root': { fontSize: '0.7rem' },
        '& .MuiTypography-root': { fontSize: '12px' }
    }
    // margin: { height: theme.spacing(130) },
}

);

function Controls(props) {
    const dispatch = useContext(GameContext);

    //const w = useRef(props.matches)
    const classes = useStyles(props);

    console.log('controls render', props)



    const onDiskCountChange = (e, val) => {
        if (val != props.diskCount)
            dispatch({ type: Actions.DISKCOUNT, diskcount: val })
    }

    const handleChangeMode = event => {
        props.changeMode(event.target.value)
    }

    const onClickStart = () => {
        dispatch({ type: Actions.GAMESTARTED })
        props.go()
    }

    const onClickStop = () => {
        dispatch({ type: Actions.GAMEPAUSED })
        props.pause()
    }

    const onClickNew = () => {
        props.newgame()
        // dispatch({ type: Actions.GAMENEW })
    }

    return (
        <div className={classes.rt} >
            <div>
                <FormLabel>
                    Режим игры
                </FormLabel>
                <RadioGroup value={props.mode}
                    onChange={handleChangeMode}
                    row>
                    <FormControlLabel disabled={props.gameStarted}
                        value="auto" control={<Radio />}
                        label="Авто" />
                    <FormControlLabel disabled={props.gameStarted}
                        value="manual" control={<Radio />}
                        label="Ручной" />
                </RadioGroup>
            </div>
            <div>
                <FormLabel>Количество дисков</FormLabel> <Slider disabled={props.gameStarted}
                    onChange={(e, val) => onDiskCountChange(e, val)}
                    value={props.diskCount}
                    track={false}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks min={1}
                    max={10}
                />
            </div>
            <div className='buttons'>
                <Button
                    disabled={props.gameStarted}
                    onClick={() => onClickStart()}
                    size="small" variant="contained" color="primary">
                    Играть
                     </Button>
                <Button disabled={!props.gameStarted || props.gameOver}
                    onClick={() => onClickStop()}
                    size="small" variant="contained" color="primary">
                    {!props.gamePaused ? 'Остановить' : 'Продолжить'}
                </Button>
                <Button disabled={!props.gamePaused && !props.gameOver}
                    onClick={() => onClickNew()}
                    size="small"
                    variant="contained"
                    color="primary">
                    Новая игра
                    </Button>
            </div>

            <div>
                {
                    props.gameStarted && <Timer
                        moveCount={props.moveCount}
                        gamePaused={props.gamePaused}
                        gameOver={props.gameOver}
                        //?? gameNew={props.gameNew}
                        gameStarted={props.gameStarted}
                    />
                }
            </div>
        </div>
    )
}

export default Controls