import { useState, useCallback, useEffect } from 'react'

function useDisk() {
    const [diskRefs, addDiskRef] = useState([]);

    useEffect(node => {
        // debugger
        if (node) {
            // boardRef = node;

            addDiskRef((s) => s.concat(node))
        }
    }, [])

    function add(ref) {

    }

    return { dref: diskRefs, add: function (node) { addDiskRef((s) => s.concat(node)) } }
}
export default useDisk