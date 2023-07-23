import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { areaGap, cardDragIndex, cardOffsetModifier, cardStartIndex, zeroSize } from "../constants/cardEngine";
import getModifiedOffset from "../helpers/getModifiedOffset";
import { useCursorData, useUpdateCursorData } from "../context/cursorContext";
import useStageControls from "../hooks/useStageControls";

const CardWrapper = ({
    stageWrapper,
    areaId,
    id,
    children
}) => {
    const { getAreas, echoAll, moveCards } = useStageControls();
    const area = getAreas()[areaId];

    const cursor = useCursorData();
    const updateCursor = useUpdateCursorData();

    const cardRef = useRef();
    const [cardSize, updateCardSize] = useState(zeroSize);

    const areaOffset = getModifiedOffset(cardSize, area.positionModifier);
    const areaIndex = area.cardIds.indexOf(id);

    const dragIndex = cursor.cardIds.indexOf(id);
    const isDragged = dragIndex >= 0;

    const areaStyle = {
        left: areaOffset.x + (areaGap.x * areaIndex), 
        top: areaOffset.y + (areaGap.y * areaIndex),
        zIndex: cardStartIndex + areaIndex
    }

    const [offset, updateOffset] = useState(areaOffset);

    const dragStyle = {
        left: offset.x - stageWrapper.offset.x - cardSize.width / 2 + (cardSize.width * cardOffsetModifier.x) + (areaGap.x * dragIndex), 
        top: offset.y - stageWrapper.offset.y - cardSize.height / 2 + (cardSize.height * cardOffsetModifier.y) + (areaGap.y * dragIndex),
        zIndex: cardDragIndex + dragIndex
    }

    const setOffset = useCallback((e) => updateOffset({x: e.clientX, y: e.clientY}), []);

    useEffect(() => {
        if (isDragged) {
            updateOffset({x: cursor.x, y: cursor.y});
        }
    }, [isDragged, cursor])

    useLayoutEffect(() => {
        const { width, height } = cardRef.current.getBoundingClientRect();
        updateCardSize({ width, height })
    }, [cardRef, stageWrapper])

    const takeCard = (e) => {
        updateCursor(state => ({
            ...state,
            cardIds: area.cardIds.slice(areaIndex)
        }));
        setOffset(e);
    }

    const dropCard = (e) => {
        moveCards({
            items: cursor.cardIds, 
            from: area.id,
            to: echoAll(e.clientX, e.clientY, area.id)
        });

        updateCursor(state => ({
            ...state,
            cardIds: []
        }));

        
    }

    return (
        <div
            ref={cardRef}
            style={isDragged ? dragStyle : areaStyle}
            className='bg-lime-700 card-wrapper'
            onClick={(e) => isDragged ? dropCard(e) : takeCard(e)}
        >
            {children}
        </div>
    )
}

export default CardWrapper;