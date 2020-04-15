import { useState, useEffect } from 'react';

const getWidth = () => window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

//Thanks Vitalie Maldur 
//https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
function useCurrentWitdh() {
    let [width, setWidth] = useState(getWidth());

    useEffect(() => {
        let timeoutId = null;
        const resizeListener = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setWidth(getWidth()), 50);
        };
        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])
    return width;
}

export default useCurrentWitdh