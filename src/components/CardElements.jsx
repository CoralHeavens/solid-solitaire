import React from "react";
import { useCards } from "../context/cardsContext";
import CardWrapper from "./CardWrapper";
import Card from "./Card";
import { zeroPoint } from "../constants/cardEngine";
import HiddenCard from "./HiddenCard";

const CardElements = ({ 
    stageWrapper = { 
        offset: zeroPoint, 
        height: zeroPoint 
    },
    comparisonKey, 
    stayVisible,
    showOnlyLast,
    freeMove,
    onAreaUpdate,
    children = []
}) => {
    const cards = useCards();

    return (
        Object.values(cards).map((card) => (
            <CardWrapper 
                key={card.id}
                card={card}
                stageWrapper={stageWrapper}
                comparisonKey={comparisonKey}
                showOnlyLast={showOnlyLast}
                stayVisible={stayVisible}
                freeMove={freeMove}
                onAreaUpdate={onAreaUpdate}
            >
                {children[0] ?? <Card />}
                {children[1] ?? <HiddenCard />}
            </CardWrapper>
        ))
    )
}

export default CardElements;