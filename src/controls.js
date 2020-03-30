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
import { GameContext } from './gameLayout'    //'./gameProvider'
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

function Controls(props) {
    const dispatch = useContext(GameContext);

    const classes = useStyles();

    const onDiskCountChange = (e, val) => {
        if (val != props.diskCount)
            dispatch({ type: Actions.DISKCOUNT, diskcount: val })

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
        dispatch({ type: Actions.GAMESTARTED });
    }// startGame(); }

    const onClickStop = () => {
        dispatch({ type: Actions.GAMESTOPPED });
    }

    const onClickNew = () => {
        dispatch({ type: Actions.DISKCOUNT, diskcount: 0 })
        setTimeout(() => {
            dispatch({ type: Actions.GAMENEW })
        }, 100);
    }

    const onClickTest = () => {
        //dispatch({ type: Actions.GAMEACTIVE });
        //  console.log(state.disks)
        debugger
    }// startGame(); }



    return (<div className='controls'>

        <div className={classes.root}>
            <h1>{props.moveCount}</h1>
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

                    onChange={(e, val) => onDiskCountChange(e, val)}
                    defaultValue={props.diskCount} //{Object.values(disks).length}
                    value={props.diskCount}
                    // getAriaValueText={() => props.diskCount} ///Object.values(disks).length}//{() => "Д"}
                    track={false}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                />
            </div>

            <div className='buttons'>
                {/* disabled={state.gameActive} */}
                <Button
                    onClick={() => onClickStart()}
                    size="small" variant="contained" color="primary">
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
                <Timer />
            }
        </div>
    </div>)
}

export default Controls