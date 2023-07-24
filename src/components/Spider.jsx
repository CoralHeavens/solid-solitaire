import React from "react";
import StageWrapper from "./StageWrapper";
import { SPIDER_AREAS } from "../data/spider/areas";
import { SPIDER_CARDS } from "../data/spider/cards";

const Spider = () => {
    return (
        <StageWrapper
            className={'field bg-slate-200'}
            areas={SPIDER_AREAS}
            cards={SPIDER_CARDS}
        />
    )
}

export default Spider;