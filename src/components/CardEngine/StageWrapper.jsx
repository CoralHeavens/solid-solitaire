import React, { useLayoutEffect, useRef, useState } from "react";
import CardWrapper from "./CardWrapper";
import { cardSets, zeroPoint } from "../../constants/cardEngine";
import Card from "./Card";

const StageWrapper = ({
    className,
    cardSet = cardSets.default,
    cards = []
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

    return (
        <section
            ref={stageRef}
            className={[
                'relative overflow-hidden',
                className,
            ].filter(item => item).join(' ')}
        >
            {cards.map(({ id, cardId }) => (
                <CardWrapper 
                    key={id} 
                    stage={stage}
                >
                    <Card cardSet={cardSet} id={cardId} />
                </CardWrapper>
            ))}
        </section>
    )
}

export default StageWrapper;