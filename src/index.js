// import './index.css'
import './App.css'
// import React from 'react'
// import {render} from 'react-dom'

import App from './board'
import Game from './game'

// render(<App/>, document.querySelector('#app'))

import React from 'react'
import { ThemeProvider, useFela, RendererProvider } from 'react-fela'
import { createRenderer } from 'fela';
import { render } from 'react-dom'

// const rule = state => ({
//     textAlign: 'center',
//     padding: '5px 10px',
//     color: state.clr,
//     // directly use the state to compute style values
//     fontSize: state.fontSize + 'pt',
//     borderRadius: 5,
//     // deeply nest media queries and pseudo classes
//     ':hover': {
//         fontSize: state.fontSize + 2 + 'pt',
//         boxShadow: '0 0 2px rgb(70, 70, 70)'
//     }
// })

// const Button = ({ children, ...props }) => {
//     const { css } = useFela(props)
//     return (
//         < button className={css(rule)} as="btn" >
//             {children}
//         </button >
//     )
// }

// const renderer = createRenderer()
/*
render(
    <RendererProvider renderer={renderer}>
        <div className="App">
            <Button>Basic Button</Button>
            <Button fontSize={18} clr="blue">
                <h3>
                    <Button>Basic Button</Button></h3>
            </Button>

            <div class="creature"></div>


        </div>
    </RendererProvider>
    ,
    document.body
    
)
*/
// let data = [
//     { idx: 0, rowStart: 1, rowEnd: 2, colStart: 1, colEnd: 2 },
//     { idx: 1, rowStart: 2, rowEnd: 3, colStart: 1, colEnd: 2 },
//     { idx: 2, rowStart: 3, rowEnd: 4, colStart: 1, colEnd: 2, },
// ]
render(
    <Game />
    , document.querySelector('#app')
)