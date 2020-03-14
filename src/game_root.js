//https://stackoverflow.com/questions/21951734/react-js-custom-events-for-communicating-with-parent-nodes/22365551#22365551
//https://codepen.io/jedwards1211/pen/zVxxEB

import React, { useState, useContext } from 'react'

function createDisks() {
    return { 1: { idx: 1, width: 100 }, 2: { idx: 2, width: 120 } }
}

function TestDisks({ disks }) {
    return (
        <div>
            {
                Object.keys(disks).map(d => (<h2>  {disks[d].width} </h2>))
            }

            <TestContext />

        </div>
    )
}


const RootContext = React.createContext(() => { });

function TestContext() {
    const disks = useContext(RootContext);
    return (
        <h1>{disks[1].width}</h1>
    )
}

function RootGame() {

    const [diskCount, setDiskCount] = useState(() => {
        const initialState = createDisks();
        return initialState;
    })



    // const specContext =React.useContext(RootContext);



    const reset = (k) => {
        setDiskCount((d) => Object.assign(
            {},
            d,
            {
                [k]: {
                    ...d[k],
                    width: d[k].width + 10
                }
            }))
    }


    console.log('cnt', diskCount)
    return (
        <div>
            <RootContext.Provider value={diskCount}>

                <TestContext />
                <button onClick={() => reset(1)}>
                    Click
                </button>

                <TestDisks disks={diskCount} />
            </RootContext.Provider>
        </div>
    )
}

export default RootGame
