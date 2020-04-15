import { makeStyles } from '@material-ui/core/styles'

const layoutStyles = makeStyles({
    game: {
        fontFamily: 'Roboto, sans-serif',
        display: 'grid',
        alignItems: 'start',
        gridTemplateColumns: 'auto',
        gridTemplateRows: 'minmax(75px, auto) auto minmax(100px, auto)',
        backgroundColor: '#ffffff',
        border: '1px solid silver',
        width: '66%',
        maxWidth: '700px',
        minWidth: '300px',
        margin: '50px auto 100px auto',
    }
})

const AppLogoSpin = "AppLogoSpin";

const headerStyles = makeStyles({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'center',
        alignItems: 'baseline',
        justifyContent: 'center',
        gridArea: '1/1/2/2',
        textAlign: 'center',
        borderBottom: '1px solid silver',
        fontSize: 40,
        fontWeight: 100,
        backgroundColor: '#fafaf1',
        color: '#4eaaaa'
    },
    caption: {
        marginRight: '15px',
        letterSpacing: 5,
        fontFamily: 'Stylish, sans-serif',
        lineHeight: '30px',
        textShadow: '1px 1px 2px black'
    },
    menuWrapper: {
        marginLeft: 15
    },
    appLogo: {
        position: 'absolute',
        left: '-32px',
        top: '-23px',
        animation: `$${AppLogoSpin} infinite 7s linear`,
        height: '45px'
    },
    "@keyframes AppLogoSpin": {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" }
    }
    //https://codesandbox.io/s/m4zy6v09wj?file=/src/fade.js:194-221
})

const boardStyles = makeStyles({
    board: props => ({
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: `repeat(${props.diskCount}, ${props.rowHeight}px)`,
        gridArea: '2/1/3/2',
        gridGap: 2,
        justifyItems: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        boxShadow: '3px 3px 1px 0px #d4b8b8',
        margin: '50px 20px 25px 20px'
    })
})

const diskStyles = makeStyles({
    disk: props => ({
        position: 'relative',
        height: '94%',
        border: '1px solid silver',
        borderRadius: 5,
        zIndex: 5,
        backgroundColor: props.color,
        width: props.width + '%',
        minWidth: props.width + '%',
        maxWidth: props.width + '%',
    })
})

const dropcellStyles = makeStyles({
    dropcell: props => ({
        width: '100%',
        height: '100%',
        gridArea: `${props.row}/${props.col}/${props.row + 1}/${props.col + 1}`,
        backgroundColor: props.isover ? '#aaffcc' : 'aliceblue' //'aqua'
    })
})

const footerStyles = makeStyles({
    footer: props => ({
        gridArea: '3/1/4/2',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderTop: '1px solid silver',
        width: 'auto',
        backgroundColor: '#fafaf1',
    }),

    manual: {
        margin: '0px 20px',
        color: '#3b6769',
        textAlign: "center",
        fontSize: '1rem'
    }
})

const controlStyles = makeStyles({
    controls: {
        position: "absolute",

        display: props => props.anchorEl ? 'flex' : 'none',
        left: props => props.anchorEl ? calcControlPos(props.anchorEl, props.width) : -3, // props.anchorEl ? (((100 * (props.anchorEl.offsetLeft + 20)) / props.width)) + '%' : -1000, //props.anchorEl.offsetLeft + 20 : -1000,   ///
        opacity: props => props.anchorEl ? 1 : 0,

        flexDirection: 'column',
        backgroundColor: '#fff', //'#f8f8f8',
        width: 270,
        top: 102,
        margin: '0 auto',
        padding: '20px 30px',
        fontSize: '0.85rem',
        boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
        zIndex: 1999,

        transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        WebkitTransition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        MozTransition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)',
        '& label, & button': { fontSize: '0.7rem' },
        '& .MuiSvgIcon-root': { fontSize: '0.7rem' },
        '& .MuiTypography-root': { fontSize: '12px' }
    },

    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
    }
})

const calcControlPos = (anchor, winWidth) => {
    if (winWidth >= 1000) {
        //debugger
        //return (100 * (anchor.offsetLeft + 20)) / winWidth + '%'

        return (100 * (anchor.getBoundingClientRect().x + 20)) / winWidth + '%'

    }

    else if (winWidth < 1000 && winWidth >= 600) {
        //return (100 * (anchor.offsetLeft - 330 + 0 + 52)) / winWidth + '%'
        return (100 * (anchor.getBoundingClientRect().x - 330 + 52)) / winWidth + '%'

    }

    else if (winWidth < 600) {
        return (winWidth / 2 - 330 / 2) + 'px'
    }
}

const timerStyles = makeStyles({
    timer: {
        color: ' #328291',
        margin: '0 auto'
    },

    gameOver: {
        backgroundColor: '#fff',
        color: '#ff5722',
        borderTop: '1px solid red',
        padding: 5,
        letterSpacing: 5,
        fontSize: '18px'
    }
})

export {
    layoutStyles,
    headerStyles,
    boardStyles,
    diskStyles,
    dropcellStyles,
    footerStyles,
    controlStyles,
    timerStyles
}