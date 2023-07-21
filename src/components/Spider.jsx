import React, { useEffect } from "react";
import StageWrapper from "./StageWrapper";
import useStageControls from "../hooks/useStageControls";
import { SPIDER_AREAS } from "../data/spider/areas";
import { SPIDER_CARDS } from "../data/spider/cards";

const Spider = () => {
    const { initAreas, initCards } = useStageControls();

    useEffect(() => {
        initAreas(SPIDER_AREAS);
        initCards(SPIDER_CARDS);
    }, [initAreas, initCards])

    return <StageWrapper className={'field bg-slate-200'} />
}

export default Spider;