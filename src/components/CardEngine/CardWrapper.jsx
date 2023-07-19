import React, { cloneElement, useCallback, useLayoutEffect, useRef, useState } from "react";
import { cardOffset, zeroPoint } from "../../constants/cardEngine";
import joinClassNames from '../../helpers/joinClassNames';
import { getElementPositionBounds } from "../../helpers/elementPositionBounds";
import { useUpdateCursorData } from "../../context/cursorContext";

const CardWrapper = ({
    stage,
    areaId,
    children
}) => {
    const Card = cloneElement(children);

    const cardRef = useRef();
    const [cardSize, updateCardSize] = useState(zeroPoint);

    const [offset, updateOffset] = useState(stage.offset);
    const [isActive, updateActive] = useState(false);

    const updateCursor = useUpdateCursorData();

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
                'bg-lime-700 card-wrapper',
                isActive && 'z-[9999]'
            )}
            onClick={(e) => {
                if (isActive) {
                    document.removeEventListener('mousemove', getAxis);
                    updateActive(false);
                    updateCursor(state => ({
                        ...state,
                        hidden: false
                    }))
                } else {
                    getAxis(e)
                    document.addEventListener('mousemove', getAxis);
                    updateActive(true);
                    updateCursor(state => ({
                        ...state,
                        hidden: true
                    }))
                };
            }}
        >
            {Card}
        </div>
    )
}

export default CardWrapper;