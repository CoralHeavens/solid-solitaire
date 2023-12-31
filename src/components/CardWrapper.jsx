import React, { cloneElement, useLayoutEffect, useMemo, useRef, useState } from "react";
import { areaGap, cardDragIndex, cardOffsetModifier, cardStartIndex, zeroSize } from "../constants/cardEngine";
import { useCursorData, useUpdateCursorData } from "../context/cursorContext";
import { useAreas } from "../context/areasContext";
import useEcho from "../hooks/useEcho";
import useMove from "../hooks/useMove";
import { usePresets } from "../context/presetsContext";
import useLock from "../hooks/useLock";
import joinClassNames from "../helpers/joinClassNames";
import useWindow from "../hooks/useWindow";

const CardWrapper = ({
    stageWrapper,
    card,
    cardClassName,
    comparisonKey,
    stayVisible,
    showOnlyLast,
    freeMove,
    lockOnSet,
    setLength,
    onAreaUpdate,
    children
}) => {
    const { areaId, id, cardType } = card;

    const { moveCards } = useMove();
    const echoAll = useEcho();
    const area = useAreas()[areaId];

    const { width, height } = useWindow();

    const isHidden = useLock({
        state: !area.isLocked && area.cardIds.at(-1) !== id, 
        lockValue: false,
        skipLock: !stayVisible
    });

    const { data, key } = usePresets();
    const Card = cloneElement(children[0], { card: data[cardType], cardSet: key });

    const cursor = useCursorData();
    const updateCursor = useUpdateCursorData();

    const cardRef = useRef();
    const [cardSize, updateCardSize] = useState(zeroSize);
    const areaIndex = area.cardIds.indexOf(id);

    const dragIndex = cursor.cardIds.indexOf(id);
    const isDragged = dragIndex >= 0;

    const areaPos = useMemo(() => document.getElementById(areaId).getBoundingClientRect(), [areaId]);

    const areaStyle = useMemo(() => ({
        left: areaPos.x - stageWrapper.offset.x + ((width * areaGap.x) * areaIndex), 
        top: areaPos.y - stageWrapper.offset.y + ((height * areaGap.y) * areaIndex),
        zIndex: cardStartIndex + areaIndex
    }), [width, height, areaIndex, areaPos, stageWrapper])

    const dragStyle = useMemo(() => {
        if (!isDragged) return;

        const isSoloDragging = cursor.cardIds.length === 1;

        const cardPosX = cursor.x - stageWrapper.offset.x - cardSize.width / 2;
        const cardPosY = cursor.y - stageWrapper.offset.y - cardSize.height / 2;

        const cardCursorOffsetX = isSoloDragging ? 0 : cardSize.width * cardOffsetModifier.x;
        const cardCursorOffsetY = isSoloDragging ? 0 : cardSize.height * cardOffsetModifier.y;

        const areaShiftX = (width * areaGap.x) * dragIndex;
        const areaShiftY = (height * areaGap.y) * dragIndex;

        return {
            left: cardPosX + cardCursorOffsetX + areaShiftX,
            top: cardPosY + cardCursorOffsetY + areaShiftY,
            zIndex: cardDragIndex + dragIndex
        }
    }, [cursor, cardSize, dragIndex, stageWrapper, isDragged, width, height])

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
            to: echoAll(e.clientX, e.clientY, area.id),
            key: freeMove ? undefined : comparisonKey,
            lockOnSet,
            setLength,
            callback: onAreaUpdate
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
            className={joinClassNames(
                'bg-lime-700 card-wrapper',
                cardClassName
            )}
            onClick={(e) => {
                if (!isHidden && !area.isLocked) {
                    isDragged ? dropCard(e) : takeCard()
                }
            }}
        >
            {(showOnlyLast && isHidden) ? (
                children[1]
            ) : Card}
        </div>
    )
}

export default CardWrapper;