import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import { Actions } from './constants'
//import { GameContext } from './hanoi-tower'
import { GameContext } from './gameProvider'
import Timer from './timer'


//alert(new Date(123 * 1000).toISOString().substr(11, 8))

const useStyles = makeStyles(theme => ({
    root: {
        width: 270,
        margin: '0 auto',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '0.8rem',
        '& label, & button': { fontSize: '0.7rem' },
        '& .MuiSvgIcon-root': { fontSize: '0.7rem' }, //{ width: '0.7em', height: '0.7em' },
        '& .MuiTypography-root': { fontSize: '12px' }
    },
    margin: {
        height: theme.spacing(30),
    },
}));

const Controls = () => {
    const { state, dispatch } = useContext(GameContext);
    const { disks, gameActive } = state;

    const classes = useStyles();

    const onDiskCountChange = (e, val) => {
        // const val = e.target.value;
        dispatch({ type: Actions.DISKCOUNT, count: val })
    }

    const handleChange = event => {
        //!! setValue(event.target.value);
        alert(event.target.value)
    };


    // useEffect(() => {
    //     //if (state.gameActive)
    //     // startGame()

    //     // dispatch({ type: 'START-GAME', startGame: sg })
    // }, [state.gameActive]);//или []

    const onClickStart = () => {
        dispatch({ type: Actions.GAMEACTIVE });
    }// startGame(); }

    const onClickStop = () => {
        dispatch({ type: Actions.GAMESTOPPED });
    }

    const onClickNew = () => {
        dispatch({ type: Actions.GAMENEW });
        setTimeout(() => {
            dispatch({ type: Actions.GAMENEW });
        }, 1000);
    }

    const onClickTest = () => {
        //dispatch({ type: Actions.GAMEACTIVE });
        console.log(state.disks)
        debugger
    }// startGame(); }



    return (<div className='controls'>
        {state.disks.length}{state.gameActive.toString()}
        <div className={classes.root}>
            <div>
                <FormLabel>Режим игры</FormLabel>
                <RadioGroup value='manual' onChange={handleChange} row>
                    <FormControlLabel value="auto" control={<Radio />} label="Авто" />
                    <FormControlLabel value="manual" control={<Radio />} label="Ручной" />
                </RadioGroup>
            </div>
            <div>
                <FormLabel>Количество дисков</FormLabel>
                <Slider
                    disabled={state.gameActive}
                    onChange={(e, val) => onDiskCountChange(e, val)}
                    defaultValue={Object.values(disks).length}
                    getAriaValueText={() => Object.values(disks).length}//{() => "Д"}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                />
            </div>

            <div className='buttons'>
                <Button
                    onClick={() => onClickStart()}
                    disabled={state.gameActive} size="small" variant="contained" color="primary">
                    Играть
            </Button>
                <Button onClick={() => onClickStop()} size="small" variant="contained" color="primary">
                    Остановить
            </Button>
                <Button onClick={() => onClickNew()} size="small" variant="contained" color="primary">
                    Новая игра
            </Button>
            </div>
        </div>
        {/* <p>
            <input type="range" min="1" max="10"
                value={Object.values(disks).length}
                onChange={(e => onDiskCountChange(e))}
            />
        </p> */}
        <p style={{ fontFamily: 'Roboto, sans-serif' }}>
            <button onClick={() => onClickTest()}>
                Test
            </button>
        </p>

        <div>
            {
                gameActive && <Timer />
            }
        </div>
    </div>)
}

export default Controls