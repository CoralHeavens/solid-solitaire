import React, { useLayoutEffect, useRef, useState } from "react";

const StickyArea = ({
    area
}) => {
    const { positionModifier } = area;
    const areaRef = useRef();
    const [areaSize, updateAreaSize] = useState({
        width: 0,
        height: 0
    })

    useLayoutEffect(() => {
        updateAreaSize(areaRef.current.getBoundingClientRect())
    }, [])

    return (
        <div
            ref={areaRef}
            className='area-border card-wrapper'
            style={{
                left: areaSize.width * positionModifier.x,
                top: areaSize.height * positionModifier.y,
            }}
        >
            
        </div>
    )
}

export default StickyArea;