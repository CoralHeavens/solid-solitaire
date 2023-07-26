import { useEffect, useState } from "react"

const useLock = ({
    state, lockValue, skipLock
}) => {
    const [value, updateValue] = useState(state);

    useEffect(() => {
        if (!skipLock && (value === lockValue || state === value)) return;
        updateValue(state);
    }, [lockValue, state, value, skipLock])

    return value;
}

export default useLock;