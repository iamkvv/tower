import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    peg: props => ({
        position: 'absolute',
        height: props.h + 5,
        width: 2,
        left: 100 * (props.k / 6) + '%',
        backgroundColor: 'rgb(196, 166, 166)',
        bottom: 0,
        top: -5,
        textAlign: 'center',
        '&:before': {
            content: "'" + props.l + "'",
            fontFamily: 'Roboto, sans-serif',
            color: 'rgb(196, 166, 166)',
            fontSize: 16,
            position: 'absolute',
            textAlign: 'center',
            top: -20,
            left: -10,
            border: '1px solid silver',
            padding: '0 4px',
            borderRadius: 26
        }
    }),
});

const Peg = (props) => {
    const classes = useStyles(props);

    return (
        <div className={classes.peg} />
    )
}

export default Peg
