import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { areaGap, cardDragIndex, cardOffsetModifier, cardStartIndex, zeroSize } from "../constants/cardEngine";
import getModifiedOffset from "../helpers/getModifiedOffset";
import { useCursorData, useUpdateCursorData } from "../context/cursorContext";
import { useAreas } from "../context/areasContext";
import useEcho from "../hooks/useEcho";
import useMove from "../hooks/useMove";

const CardWrapper = ({
    stageWrapper,
    areaId,
    id,
    children
}) => {
    const { moveCards } = useMove();
    const echoAll = useEcho();
    const area = useAreas()[areaId];

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

    const dragStyle = useMemo(() => {
        if (!isDragged) return;

        const isSoloDragging = cursor.cardIds.length === 1;

        const cardPosX = cursor.x - stageWrapper.offset.x - cardSize.width / 2;
        const cardPosY = cursor.y - stageWrapper.offset.y - cardSize.height / 2;

        const cardCursorOffsetX = isSoloDragging ? 0 : cardSize.width * cardOffsetModifier.x;
        const cardCursorOffsetY = isSoloDragging ? 0 : cardSize.height * cardOffsetModifier.y;

        const areaShiftX = areaGap.x * dragIndex;
        const areaShiftY = areaGap.y * dragIndex;

        return {
            left: cardPosX + cardCursorOffsetX + areaShiftX,
            top: cardPosY + cardCursorOffsetY + areaShiftY,
            zIndex: cardDragIndex + dragIndex
        }
    }, [cursor, cardSize, dragIndex, stageWrapper, isDragged])

    useLayoutEffect(() => {
        const { width, height } = cardRef.current.getBoundingClientRect();
        updateCardSize({ width, height })
    }, [cardRef, stageWrapper])

    const takeCard = () => {
        updateCursor(state => ({
            ...state,
            cardIds: area.cardIds.slice(areaIndex)
        }));
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
            onClick={(e) => isDragged ? dropCard(e) : takeCard()}
        >
            {children}
        </div>
    )
}

export default CardWrapper;