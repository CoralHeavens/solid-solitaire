import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { cardOffset, zeroPoint } from "../../constants/cardEngine";
import joinClassNames from "../../helpers/joinClassNames";
import { getElementPositionBounds } from "../../helpers/elementPositionBounds";

const CardWrapper = ({
    stage,
    children
}) => {
    const cardRef = useRef();
    const [cardSize, updateCardSize] = useState(zeroPoint);

    const [offset, updateOffset] = useState(stage.offset);
    const [isActive, updateIsActive] = useState(false);

    useLayoutEffect(() => {
        updateOffset(stage.offset);

        const { width, height } = cardRef.current.getBoundingClientRect();
        updateCardSize({
            x: width,
            y: height,
        })
    }, [stage.offset, cardRef])

    const getAxis = useCallback((e) => {
        updateOffset({x: e.clientX, y: e.clientY})
    }, [])

    const getOffset = (axis) => {
        return getElementPositionBounds({
            size: stage.size[axis],
            offset: offset[axis] - stage.offset[axis] - (cardSize[axis] / 2 + cardOffset[axis]),
            cardOffset: cardSize[axis],
        });
    }

    return (
        <div
            ref={cardRef}
            style={{
                left: getOffset('x'),
                top: getOffset('y'),
            }}
            className={joinClassNames(
                'bg-fuchsia-400 rounded-xl w-32 h-32 flex p-10',
                'justify-center items-center absolute'
            )}
            onClick={(e) => {
                if (isActive) {
                    document.removeEventListener('mousemove', getAxis);
                    updateIsActive(false);
                } else {
                    getAxis(e)
                    document.addEventListener('mousemove', getAxis);
                    updateIsActive(true);
                };
            }}
        >
            {children}
        </div>
    )
}

export default CardWrapper;