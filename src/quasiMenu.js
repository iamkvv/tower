import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Controls from './controls'
import MenuItem from './menuItem'
import useCurrentWidth from './useWidth'

const QuasiMenu = (props) => {
    let width = useCurrentWidth();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log('GameMenu props.amover', anchorEl, props.amover)

    return (
        <div >
            <IconButton onClick={handleOpen}>
                <MenuIcon color="primary" style={{ fontSize: 48 }} />
            </IconButton>

            <MenuItem anchorEl={anchorEl} handleClose={handleClose}>
                <Controls width={width}
                    anchorEl={anchorEl}
                    closeOnStart={handleClose}
                    {...props} />
            </MenuItem>
        </div>
    )
}

export default QuasiMenu