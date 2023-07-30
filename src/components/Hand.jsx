import React, { useState } from "react";
import joinClassNames from "../helpers/joinClassNames";
import usePush from "../hooks/usePush";

const Hand = ({
    initCards,
    setLength,
    lockOnSet,
    cardsPerDraw = 10,
    className,
    children
}) => {
    const [cards, updateCards] = useState(initCards);
    const { pushCards } = usePush();

    const drawCards = () => {
        if (!cards.length) return;

        pushCards({ 
            newCards: cards.slice(0, cardsPerDraw), 
            setLength, 
            lockOnSet
        });
        updateCards(state => state.slice(cardsPerDraw));
    }

    return cards.length ? (
        <div className={joinClassNames(
            'hand-wrapper bg-lime-700 bottom-0 right-0',
            className
        )}
            onClick={drawCards}
        >
            {children}
        </div>
    ) : null;
}

export default Hand;