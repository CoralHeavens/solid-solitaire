import React, { useCallback, useEffect } from "react";
import { useCursorData, useUpdateCursorData } from "../context/cursorContext";

const Cursor = ({
    cursorName = 'default',
    size = 30
}) => {
    const cursor = useCursorData();
    const updateCursor = useUpdateCursorData();

    const moveCursor = useCallback((e) => {
        updateCursor(state => ({
            ...state,
            x: e.clientX,
            y: e.clientY,
        }))
    }, [updateCursor]);

    useEffect(() => {
        document.addEventListener('mousemove', moveCursor);
        return () => {
            document.removeEventListener('mousemove', moveCursor);
        }
    }, [moveCursor])

    return (cursor?.x && cursor?.y) ? (
        <img 
            src={require(`../svg/cursor/${cursorName}.svg`)} 
            className="absolute z-[9999] pointer-events-none rotate-[290deg]"
            style={{
                left: cursor.x,
                top: cursor.y,
            }}
            width={size} 
            height={size}
            alt=''
        />
    ) : null;
}

export default Cursor;