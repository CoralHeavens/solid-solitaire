import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import joinClassNames from "../helpers/joinClassNames";
import { zeroPoint } from "../constants/cardEngine";
import AreaElements from "./AreaElements";
import CardElements from "./CardElements";
import { useAreas, useUpdateAreas } from "../context/areasContext";
import { useCards, useUpdateCards } from "../context/cardsContext";
import usePush from "../hooks/usePush";
import useMove from "../hooks/useMove";

const StageBorder = () => (
    <div className="w-[100.6%] h-[101.1%] -ml-[0.3%] -mt-[0.3%] pointer-events-none rounded-[16px] bg-slate-200" />
)

const StageWrapper = ({
    className,
    areas,
    cards
}) => {
    const stageRef = useRef();
    const [stageBounds, updateStageBounds] = useState({
        offset: zeroPoint,
        size: zeroPoint
    });

    const { moveCards } = useMove();
    const { pushAreas, pushCards } = usePush();

    const updateAreas = useUpdateAreas();
    const updateCards = useUpdateCards();
    
    const globalAreasArray = Object.keys(useAreas());
    const globalCardsArray = Object.keys(useCards());

    global.clearStage = () => {
        updateAreas({});
        updateCards({});

        return `Stage cleared of ${globalAreasArray.length} areas and ${globalCardsArray.length} cards`;
    };

    global.addArea = (
        areaType = '0',
        positionModifier = {
            x: 0,
            y: 0,
        }
    ) => {
        pushAreas([
            {
                areaType,
                positionModifier
            },
        ]);

        return `Area of type ${areaType} pushed to stage`;
    }

    global.addCard = (
        cardType = '0', 
        areaId = undefined
    ) => {
        const id = areaId ? areaId : globalAreasArray[0];
        pushCards([{ cardType, areaId: id }])

        return `Card of type ${cardType} pushed to area ${id}`;
    }

    global.moveCard = (
        fromAreaId = globalAreasArray[0], 
        toAreaId = globalAreasArray[0], 
        cardIdsArray = []
    ) => {
        const hasCards = cardIdsArray.length !== 0;
        moveCards({
            items: hasCards ? cardIdsArray : undefined,
            from: fromAreaId,
            to: toAreaId
        })

        return `${hasCards ? cardIdsArray.length : 'All'} items moved from ${fromAreaId} to ${toAreaId}`;
    };

    useEffect(() => {
        pushAreas(areas);
        pushCards(cards);

        return global.clearStage;
    }, [areas, cards, pushAreas, pushCards]);

    useLayoutEffect(() => {
        const { top, left, width, height } = stageRef.current.getBoundingClientRect();
        updateStageBounds({
            offset: {
                x: left,
                y: top,
            },
            size: {
                x: width,
                y: height,
            }
        })
    }, [stageRef])

    return (
        <section
            ref={stageRef}
            className={joinClassNames(
                'relative',
                className
            )}
        >
            <StageBorder />
            <AreaElements />
            <CardElements stageWrapper={stageBounds} />

        </section>
    )
}

export default StageWrapper;