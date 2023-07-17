import React, { useLayoutEffect, useRef, useState } from "react";
import CardWrapper from "./CardWrapper";
import { defaultCardSet, zeroPoint } from "./constants";

const StageWrapper = ({
    className,
    cards = defaultCardSet,
    children,
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
            {cards.map(({ id }) => (
                <CardWrapper 
                    key={id} 
                    stage={stage}
                >
                    {children}
                </CardWrapper>
            ))}
        </section>
    )
}

export default StageWrapper;