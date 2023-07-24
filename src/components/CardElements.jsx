import React from "react";
import { useCards } from "../context/cardsContext";
import CardWrapper from "./CardWrapper";
import Card from "./Card";
import { zeroPoint } from "../constants/cardEngine";

const CardElements = ({ stageWrapper = { offset: zeroPoint, height: zeroPoint } }) => {
    const cards = useCards();

    return (
        Object.values(cards).map(({ id, areaId, cardType }) => (
            <CardWrapper 
                key={id}
                id={id}
                areaId={areaId} 
                stageWrapper={stageWrapper}
            >
                <Card 
                    cardSet={'default'} 
                    id={cardType} 
                />
            </CardWrapper>
        ))
    )
}

export default CardElements;