import React, { useContext, useRef, useEffect, forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Actions } from './constants'
import { GameContext } from './gameLayout' //'./gameProvider'

const useStyles = makeStyles({
    controls: {
        position: "absolute",
        display: props => props.anchorEl ? 'flex' : 'none',
        flexDirection: 'column',
        backgroundColor: '#fff', //'#f8f8f8',
        width: 270,
        margin: '0 auto',
        padding: '20px 30px',
        fontSize: '0.8rem',
        zIndex: 1999,
        left: props => props.anchorEl ? calcControlPos(props.anchorEl, props.width) : -1000,   // props.anchorEl ? (((100 * (props.anchorEl.offsetLeft + 20)) / props.width)) + '%' : -1000, //props.anchorEl.offsetLeft + 20 : -1000,   ///
        top: 100,
        boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',

        // opacity: 0,

        // transition: 'opacity 163ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 109ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        // transitionProperty: 'opacity, transform',
        // transitionDuration: '163ms, 109ms',
        // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1)',
        // transitionDelay: '0ms, 0ms',

        '& label, & button': { fontSize: '0.7rem' },
        '& .MuiSvgIcon-root': { fontSize: '0.7rem' },
        '& .MuiTypography-root': { fontSize: '12px' }
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    }
});

const calcControlPos = (anchor, winWidth) => {
    if (winWidth >= 1000) {
        return (100 * (anchor.offsetLeft + 20)) / winWidth + '%'
    } else if (winWidth < 1000 && winWidth >= 600) {
        return (100 * (anchor.offsetLeft - 330 + 20)) / winWidth + '%'
    } else if (winWidth < 600) {
        return (winWidth / 2 - 330 / 2) + 'px'
    }
}

function Controls(props) {
    const dispatch = useContext(GameContext);
    const classes = useStyles(props);

    console.log("Controls", props);


    const onDiskCountChange = (e, val) => {
        if (val != props.diskCount)
            dispatch({ type: Actions.DISKCOUNT, diskcount: val })
    }

    const handleChangeMode = event => {
        // props.changeMode(event.target.value)
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

//Controls = forwardRef(Controls)
export default Controls