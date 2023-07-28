import React from "react";
import ReactCardEngine from "./ReactCardEngine";
import arrayToObject from '../helpers/arrayToObject';
import getShuffledBlankArray from "../helpers/getShuffledBlankArray";

const Spider = () => {
    const AREAS = require('../data/default/areas.json');
    const SHUFFLED_SET = getShuffledBlankArray(
        require('../data/default/cards.json'), 
        (index) => ({ cardType: `${index}` })
    );
    const CARDS = [...SHUFFLED_SET, ...SHUFFLED_SET];

    const onAreaUpdate = ({ from, to, items }) => {
        // console.log(arrayToObject(items));
    }

    return (
        <ReactCardEngine
            className={'field bg-slate-200'}
            areas={AREAS}
            cards={CARDS.slice(0, 54)}
            compareWeights
            showOnlyLast
            stayVisible
            randomDistribution
            onAreaUpdate={onAreaUpdate}
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