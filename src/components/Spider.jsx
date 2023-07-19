import React, { useId } from "react";
import StageWrapper from "./CardEngine/StageWrapper";
import { cardSets } from "../constants/cardEngine";

const Spider = () => {
    return (
        <StageWrapper 
            className={'field bg-slate-200'}
            cardSet={cardSets.default}
            cards={[
                {
                    cardId: '28',
                    id: useId(),
                },
                {
                    cardId: '29',
                    id: useId(),
                }
            ]}
        />
    )
}

export default Spider;