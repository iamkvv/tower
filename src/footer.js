import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Timer from './timer'

const useStyles = makeStyles({
    footer: props => ({
        gridArea: '3/1/4/2',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        border: '1px solid silver',
        margin: '0 -1px',
        width: 'auto'
    }),
    manual: {
        margin: '0px 20px',
        color: '#3b6769',
        //backgroundColor: 'aqua',
        textAlign: "center",
        fontSize: '0.9rem'
    }
})

const Manual = (props) => {
    return (
        <div className={props.class}>
            Переместите диски со столбца "A" на столбец "B". Больший диск нельзя
            помещать на меньший. Играть можно в автоматическом и в ручном режиме.
            В ручном режиме пользуйтесь перетакиванием (Drag & Drop).
        </div>
    )
}

const Footer = (props) => {

    const classes = useStyles(props);
    // console.log("footer", props)

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