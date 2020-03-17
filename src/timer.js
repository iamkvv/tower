import React, { useEffect, useState } from 'react'
const Timer = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + 1);
        }, 1000);
        return () => {
            clearInterval(id)
        };
    }, []);

    return (
        <div>
            {new Date(count * 1000).toISOString().substr(11, 8)}
        </div>
    )
}
export default Timer