import React, { useCallback, useEffect } from "react";
import { useCursorData, useUpdateCursorData } from "../context/cursorContext";
import { cursorOffset } from "../constants/cardEngine";
import joinClassNames from "../helpers/joinClassNames";

const Cursor = ({
    cursorName = 'default',
    size = 30,
    hide = false,
}) => {
    const cursor = useCursorData();
    const updateCursor = useUpdateCursorData();

    const moveCursor = useCallback((e) => {
        updateCursor(state => ({
            ...state,
            x: e.clientX - cursorOffset.x,
            y: e.clientY - cursorOffset.y
        }))
    }, [updateCursor]);

    useEffect(() => {
        document.addEventListener('mousemove', moveCursor);
        return () => {
            document.removeEventListener('mousemove', moveCursor);
        }
    }, [moveCursor])

    return (cursor?.x && cursor?.y && !cursor?.hidden) ? (
        <img 
            src={require(`../svg/cursor/${cursorName}.svg`)} 
            className={joinClassNames(
                "absolute z-[9999] pointer-events-none rotate-[290deg]",
                hide && 'hidden'
            )}
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