import React, { useLayoutEffect, useRef, useState } from "react";
import { zeroSize } from "../constants/cardEngine";
import getModifiedOffset from "../helpers/getModifiedOffset";

const StickyArea = ({
    area
}) => {
    const { positionModifier, id } = area;
    
    const areaRef = useRef();
    const [areaSize, updateAreaSize] = useState(zeroSize);
    const { x: left, y: top } = getModifiedOffset(areaSize, positionModifier);

    useLayoutEffect(() => {
        updateAreaSize(areaRef.current.getBoundingClientRect())
    }, [])

    return (
        <div
            id={id}
            ref={areaRef}
            className='area-border area-wrapper'
            style={{ left, top, }}
        />
    )
}

export default StickyArea;