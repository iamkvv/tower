import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'


const TestMenu = (props) => {

    console.log('TestMenu', props)

    useEffect(() => {
        var p = document.createElement("h1");
        document.body.appendChild(p);
    }, [])



    return (
        // <div style={{ color: 'blue' }}>
        <React.Fragment>
            {
                ReactDOM.createPortal(
                    <React.Fragment>
                        <div
                            onClick={() => props.handleClose()}
                            style={{
                                position: 'fixed',
                                zIndex: 1500,
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                visibility: props.anchorEl ? "visible" : "hidden"
                            }}>

                        </div>
                        {props.children}
                    </React.Fragment>
                    ,
                    document.body)

            }
        </React.Fragment>

        // </div>
    )
}

export default TestMenu