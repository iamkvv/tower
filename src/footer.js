import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Timer from './timer'

const useStyles = makeStyles({
    footer: props => ({
        gridArea: '3/1/4/2',
        display: 'flex',
        alignItems: 'center',
        //height: '100%',
        alignSelf: 'stretch',
        borderTop: '1px solid silver',
        width: 'auto',
        backgroundColor: '#fafaf1',
    }),
    manual: {
        margin: '0px 20px',
        color: '#3b6769',

        textAlign: "center",
        fontSize: '0.9rem'
    }
})

const Manual = (props) => {
    return (
        <div className={props.class}>
            Move discs from column 'A' to column 'B'.
            A larger disk cannot be placed on a smaller one.
            You can play in automatic and manual mode.
            In manual mode use Drag&Drop.
        </div>
    )
}

const Footer = (props) => {
    const classes = useStyles(props);

    return (
        <div className={classes.footer}>
            {!props.gameStarted ?
                < Manual class={classes.manual} /> :
                <Timer {...props} />
            }
        </div>
    )
}

export default Footer