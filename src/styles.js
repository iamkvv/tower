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

const headerStyles = makeStyles({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'center',
        alignItems: 'baseline',
        justifyContent: 'center',
        gridArea: '1 /1/2/2',
        textAlign: 'center',
        borderBottom: '1px solid silver',
        fontSize: 40,
        fontWeight: 100,
        backgroundColor: '#fafaf1',
        color: '#4eaaaa'
    },
    caption: {
        marginRight: '15px',
        letterSpacing: 5
    },
    menuWrapper: {
        marginLeft: 15
    }

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



export { layoutStyles, headerStyles, boardStyles }