import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import CardWrapper from "./CardWrapper";
import { cardSets, zeroPoint } from "../../constants/cardEngine";
import Card from "./Card";
import StickyArea from "./StickyArea";
import parseElements from "../../helpers/parseElements";

const StageWrapper = ({
    className,
    cardSet = cardSets.default,
    cards = [],
    areas = [],
}) => {
    const stageRef = useRef();

    const [stage, updateStage] = useState({
        offset: zeroPoint,
        size: zeroPoint,
    });

    useLayoutEffect(() => {
        const { top, left, width, height } = stageRef.current.getBoundingClientRect();
        updateStage({
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

    const [Areas, updateAreas] = useState(
        useMemo(() => (
            areas.map((area) => ({
                ...area,
                element: (
                    <StickyArea
                        key={area.id}
                        area={area}
                    />
                )
            })).reduce((o, area) => ({ 
                ...o, 
                [area.id]: area
            }), {})
        ), [areas])
    )

    const Cards = useMemo(() => cards.map(({ id, cardId, areaId }) => {


        return (
            <CardWrapper 
                key={id}
                areaId={areaId} 
                stage={stage}
            >
                <Card cardSet={cardSet} id={cardId} />
            </CardWrapper>
        )
    }), [cards, cardSet, stage])

    return (
        <section
            ref={stageRef}
            className={[
                'relative overflow-hidden',
                className,
            ].filter(item => item).join(' ')}
        >
            {parseElements(Areas)}

            {Cards}
        </section>
    )
}

export default StageWrapper;