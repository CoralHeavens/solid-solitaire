import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import joinClassNames from "../helpers/joinClassNames";
import { zeroPoint } from "../constants/cardEngine";
import AreaElements from "./AreaElements";
import CardElements from "./CardElements";
import { useAreas, useUpdateAreas } from "../context/areasContext";
import { useCards, useUpdateCards } from "../context/cardsContext";
import { useUpdatePresets } from "../context/presetsContext";
import usePush from "../hooks/usePush";
import useMove from "../hooks/useMove";
import { SPIDER_AREAS } from "../data/spider/areas";
import { SPIDER_CARDS } from "../data/spider/cards";

const StageBorder = () => (
    <div className="w-[100.6%] h-[101.1%] -ml-[0.3%] -mt-[0.3%] pointer-events-none rounded-[16px] bg-slate-200" />
)

const StageWrapper = ({
    className,
    areas = SPIDER_AREAS,
    cards = SPIDER_CARDS,
    cardPresets = require(`../data/default/cards.json`),
    comparisonKey = 'category',
    compareWeights = false,
    stayVisible = false,
    freeMove = false,
    showOnlyLast = false,
    randomDistribution = false,
    equalDistribution = false,
    onAreaUpdate = () => {},
    children,
}) => {
    const stageRef = useRef();
    const [stageBounds, updateStageBounds] = useState({
        offset: zeroPoint,
        size: zeroPoint
    });

    const { moveCards } = useMove();
    const { pushAreas, pushCards, initialPush } = usePush();

    const updateAreas = useUpdateAreas();
    const updateCards = useUpdateCards();
    const updatePresets = useUpdatePresets();

    const globalAreas = useAreas();
    const globalCards = useCards();

    const globalAreasArray = Object.keys(globalAreas);
    const globalCardsArray = Object.keys(globalCards);

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
        const isSuccess = moveCards({
            items: hasCards ? cardIdsArray : undefined,
            from: fromAreaId,
            to: toAreaId,
            key: freeMove ? undefined : comparisonKey,
            callback: onAreaUpdate
        })

        return isSuccess ? (
            `${hasCards ? cardIdsArray.length : 'All'} items moved from ${fromAreaId} to ${toAreaId}`
        ) : (
            `Card ${cardIdsArray[0]} cannot be moved to area ${toAreaId}`
        );
    };

    global.getCard = (id) => {
        if (id) return globalCards[id];
        return globalCards;
    }

    global.getArea = (id) => {
        if (!id)  return globalAreas;
        return globalAreas[id];
    }

    useEffect(() => {
        updatePresets({
            data: cardPresets,
            compareWeights
        });
        initialPush({
            newAreas: areas, 
            newCards: cards, 
            randomDistribution, 
            equalDistribution
        })

        return global.clearStage;
    }, [
        areas, cards, initialPush,
        cardPresets, updatePresets, compareWeights,
        equalDistribution, randomDistribution
    ]);

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
            <CardElements 
                stageWrapper={stageBounds}
                comparisonKey={comparisonKey}
                stayVisible={stayVisible}
                showOnlyLast={showOnlyLast}
                freeMove={freeMove}
                onAreaUpdate={onAreaUpdate}
            >
                {children}
            </CardElements>

        </section>
    )
}

export default StageWrapper;