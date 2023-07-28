import React, { useLayoutEffect, useRef, useState } from "react";
import { zeroSize } from "../constants/cardEngine";
import getModifiedOffset from "../helpers/getModifiedOffset";
import joinClassNames from "../helpers/joinClassNames";

const StickyArea = ({
    area
}) => {
    const { positionModifier, id } = area;
    
    const areaRef = useRef();
    const [areaSize, updateAreaSize] = useState(zeroSize);
    const areaStyle = positionModifier ? {
        left: getModifiedOffset(areaSize, positionModifier).x,
        top: getModifiedOffset(areaSize, positionModifier).y
    } : {};

    useLayoutEffect(() => {
        updateAreaSize(areaRef.current.getBoundingClientRect())
    }, [])

    return (
        <div
            id={id}
            ref={areaRef}
            className={joinClassNames(
                'area-border area-wrapper',
                positionModifier && 'absolute'
            )}
            style={areaStyle}
        />
    )
}

export default StickyArea;