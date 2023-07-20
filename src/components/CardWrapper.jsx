import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { areaGap, cardStartIndex, zeroSize } from "../constants/cardEngine";
import joinClassNames from '../helpers/joinClassNames';
import getModifiedOffset from "../helpers/getModifiedOffset";

const CardWrapper = ({
    stageWrapper,
    areaId,
    id,
    children
}) => {
    const [area, updateArea] = useState(global.stage.getAreas()[areaId]);

    const cardRef = useRef();
    const [cardSize, updateCardSize] = useState(zeroSize);

    const areaOffset = getModifiedOffset(cardSize, area.positionModifier);
    const index = area.cardIds.indexOf(id);

    const baseStyle = {
        left: areaOffset.x + (areaGap.x * index), 
        top: areaOffset.y + (areaGap.y * index),
        zIndex: cardStartIndex + index
    }

    const [offset, updateOffset] = useState(areaOffset);

    const draggedStyle = {
        left: offset.x - stageWrapper.offset.x - cardSize.width / 2, 
        top: offset.y - stageWrapper.offset.y - cardSize.height / 2
    }

    const [isDragged, updateIsDragged] = useState(false);

    useLayoutEffect(() => {
        const { width, height } = cardRef.current.getBoundingClientRect();
        updateCardSize({ width, height })
    }, [cardRef, stageWrapper])

    const setOffset = useCallback((e) => updateOffset({x: e.clientX, y: e.clientY}), [])

    const takeCard = (e) => {
        if (area.cardIds.length - 1 > index) return;

        setOffset(e);
        document.addEventListener('mousemove', setOffset);
        updateIsDragged(true);
    }

    const dropCard = () => {
        document.removeEventListener('mousemove', setOffset);
        updateIsDragged(false);

        const echo = global.stage.echoAll(area.id, cardRef.current.getBoundingClientRect());
        if (echo.id === area.id) return;

        global.stage.moveCard(id, area.id, echo.id);
        updateArea(echo);
    }

    return (
        <div
            ref={cardRef}
            style={isDragged ? draggedStyle : baseStyle}
            className={joinClassNames(
                'bg-lime-700 card-wrapper',
                isDragged && 'z-[9999]'
            )}
            onClick={(e) => isDragged ? dropCard() : takeCard(e)}
        >
            {children}
        </div>
    )
}

export default CardWrapper;