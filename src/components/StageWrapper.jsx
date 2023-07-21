import React, { useLayoutEffect, useRef, useState } from "react";
import joinClassNames from "../helpers/joinClassNames";
import { zeroPoint } from "../constants/cardEngine";
import useStageControls from "../hooks/useStageControls";

const StageBorder = () => (
    <div className="w-[100.6%] h-[101.1%] -ml-[0.3%] -mt-[0.3%] pointer-events-none rounded-[16px] bg-slate-200" />
)

const StageWrapper = ({
    className
}) => {
    const stageRef = useRef();
    const { AreaElements, CardElements } = useStageControls();

    const [stageBounds, updateStageBounds] = useState({
        offset: zeroPoint,
        size: zeroPoint
    });

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