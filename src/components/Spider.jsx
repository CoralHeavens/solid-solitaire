import React, { useState } from "react";
import StageWrapper from "./CardEngine/StageWrapper";
import { cardSets } from "../constants/cardEngine";

const Spider = () => {
    const [cards, updateCards] = useState([
        {
            cardId: '28',
            id: 'card_1',
            areaId: 'area_1'
        },
        {
            cardId: '29',
            id: 'card_2',
            areaId: 'area_1'
        }
    ]);

    const [areas, updateAreas] = useState([
        {
            areaId: '0',
            id: 'area_1',
            positionModifier: {
                x: 0.5,
                y: 0,
            },
            cardIds: [
                'card_1',
                'card_2',
            ]
        },
        {
            areaId: '0',
            id: 'area_2',
            positionModifier: {
                x: 2.5,
                y: 0,
            },
            cardIds: [
            ]
        },
        {
            areaId: '0',
            id: 'area_3',
            positionModifier: {
                x: 4.5,
                y: 0,
            },
            cardIds: [
            ]
        },
        {
            areaId: '0',
            id: 'area_4',
            positionModifier: {
                x: 6.5,
                y: 0,
            },
            cardIds: [
            ]
        },
        {
            areaId: '0',
            id: 'area_5',
            positionModifier: {
                x: 8.5,
                y: 0,
            },
            cardIds: [
            ]
        }
    ]);

    return (
        <StageWrapper 
            className={'field bg-slate-200 border-slate-200 border-4'}
            cardSet={cardSets.default}
            cards={cards}
            areas={areas}
        />
    )
}

export default Spider;