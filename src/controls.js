import React, { useContext, useRef, useEffect, forwardRef } from 'react'
import { controlStyles } from './styles'

import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Actions } from './constants'
import { GameContext } from './gameLayout'

function Controls(props) {
    const dispatch = useContext(GameContext)
    const classes = controlStyles(props)

    const onDiskCountChange = (e, val) => {
        if (val != props.diskCount)
            dispatch({ type: Actions.DISKCOUNT, diskcount: val })
    }

    const handleChangeMode = event => {
        dispatch({ type: Actions.CHANGEMODE, mode: event.target.value })
    }

    const onClickStart = () => {
        dispatch({ type: Actions.GAMESTARTED })

        if (props.mode === 'auto') {
            props.amover.start()
        }
        props.closeOnStart()
    }

    const onClickStop = () => {
        dispatch({ type: Actions.GAMEPAUSED })

        if (props.mode === 'manual') return
        if (props.amover) {
            props.amover.pause()
            if (!props.amover.isPause) {
                props.amover.continue()
                props.closeOnStart()
            }
        }
    }

    const onClickNew = () => {
        if (props.mode === 'auto') {
            if (props.amover) {//??
                props.amover.clearEventHandler();
            }
        }
        dispatch({ type: Actions.GAMENEW })
    }

    return (
        <div className={classes.controls} >
            <div>
                <FormLabel>
                    Mode
                </FormLabel>
                <RadioGroup value={props.mode}
                    onChange={handleChangeMode}
                    row>
                    <FormControlLabel disabled={props.gameStarted}
                        value="auto" control={<Radio />}
                        label="Auto" />
                    <FormControlLabel disabled={props.gameStarted}
                        value="manual" control={<Radio />}
                        label="Manual" />
                </RadioGroup>
            </div>
            <div style={{ marginTop: 7 }}>
                <FormLabel>Disks</FormLabel>
                <Slider disabled={props.gameStarted}
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
            <div className={classes.buttons}>
                <Button
                    disabled={props.gameStarted}
                    onClick={() => onClickStart()}
                    size="small" variant="contained" color="primary">
                    Start
               </Button>
                <Button disabled={!props.gameStarted || props.gameOver}
                    onClick={() => onClickStop()}
                    size="small" variant="contained" color="primary">
                    {!props.gamePaused ? 'Pause' : 'Continue'}
                </Button>
                <Button disabled={!props.gamePaused && !props.gameOver}
                    onClick={() => onClickNew()}
                    size="small"
                    variant="contained"
                    color="primary">
                    New game
                    </Button>
            </div>
        </div>
    )
}

export default Controls