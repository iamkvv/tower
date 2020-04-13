import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Menu from '@material-ui/core/Menu';
import Controls from './controls'
import TestMenu from './testMenu'
import useCurrentWidth from './useWidth'


const GameMenu = (props) => {
    let width = useCurrentWidth();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => {
        //getComputedStyle( event.currentTarget).width:
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        // debugger
        setAnchorEl(null);
    };

    console.log('GameMenu props.amover', anchorEl, props.amover)

    const onClick = (e) => {
        console.log(e)
        debugger
    }
    //(e) => onClick(e)
    return (
        <div >

            <IconButton onClick={handleOpen}>
                <MenuIcon color="primary" style={{ fontSize: 48 }} />
            </IconButton>

            <TestMenu anchorEl={anchorEl} handleClose={handleClose}>
                <Controls width={width} anchorEl={anchorEl} closeOnStart={handleClose} {...props} />
            </TestMenu>

        </div>
    )
}

export default GameMenu