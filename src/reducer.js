import { Actions } from './constants'

const reducer = (state, action) => {
    switch (action.type) {
        case Actions.DISKCOUNT:
            return Object.assign({}, state, { diskCount: action.diskcount, moveCount: 0 });

        case Actions.DISKMOVED:
            return Object.assign({}, state, { moveCount: state.moveCount + 1 });

        case Actions.CHANGEMODE:
            return Object.assign({}, state, {
                mode: action.mode,
                moveCount: 0,
                gameOver: false,
                gamePaused: false,
                gameStarted: false
            });

        case Actions.GAMEOVER:
            return Object.assign({}, state, { gameOver: true });

        case Actions.GAMESTARTED:
            return Object.assign({}, state, { gameOver: false, gamePaused: false, gameStarted: true });

        case Actions.GAMEPAUSED:
            return Object.assign({}, state, { gamePaused: !state.gamePaused });

        case Actions.GETMOVER:
            return Object.assign({}, state, { amover: action.mover });

        case Actions.GAMENEW:
            return Object.assign({}, state, { gameNew: !state.gameNew, diskCount: 2, moveCount: 0, gamePaused: false, gameStarted: false, gameOver: false });

        default:
            throw new Error();
    }
}

const init = (diskcount) => {
    return {
        diskCount: diskcount,
        mode: 'auto',
        moveCount: 0,
        gameOver: false,
        rowHeight: 30,
        gameStarted: false,
        gamePaused: false,
        gameNew: false,
        amover: null
    }
}



export { reducer, init }
