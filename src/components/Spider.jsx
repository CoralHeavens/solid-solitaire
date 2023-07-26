import React from "react";
import { SPIDER_AREAS } from "../data/spider/areas";
import { SPIDER_CARDS } from "../data/spider/cards";
import ReactCardEngine from "./ReactCardEngine";

const Spider = () => {
    return (
        <ReactCardEngine
            className={'field bg-slate-200'}
            areas={SPIDER_AREAS}
            cards={SPIDER_CARDS}
            compareWeights
            showOnlyLast
            stayVisible
        >
            { /*
                You can pass element here to render as a card
                'card' and 'cardSet' data will be pushed into this element

                There is <Card /> element available as preset
                Although you can skip passing the element so <Card /> will be rendered by default

                Furthermore, second child will be used as hidden card element
                There is <HiddenCard /> element available as preset and set by default
            */}
        </ReactCardEngine>
    )
}

export default Spider;