import { useAreas, useUpdateAreas } from "../context/areasContext";
import { useCards, useUpdateCards } from "../context/cardsContext";
import StickyArea from "../components/StickyArea";
import getBounds from "../helpers/getBounds";
import Card from "../components/Card";
import CardWrapper from "../components/CardWrapper";
import { zeroPoint } from "../constants/cardEngine";
import { useCallback, useMemo } from "react";

const useStageControls = () => {
    const updateCards = useUpdateCards();
    const cards = useCards();

    const updateAreas = useUpdateAreas();
    const areas = useAreas();

    const updateCardsAreaId = (items, areaId) => (
        updateCards(state => {
            const result = { ...state };
            items.forEach(id => result[id].areaId = areaId);
            return result;
        })
    );

    const getAreas = () => areas;

    const getCards = () => cards;

    const addToAreaCards = (items, areaId) => (
        updateAreas(state => (
            {
                ...state,
                [areaId]: {
                    ...state[areaId],
                    cardIds: [...state[areaId].cardIds, ...items]
                }
            }
        ))
    )

    const removeFromAreaCards = (items, id) => (
        updateAreas(state => (
            {
                ...state,
                [id]: {
                    ...state[id],
                    cardIds: state[id].cardIds.filter(cardId => items.indexOf(cardId) === -1)
                }
            }
        ))
    )

    const initAreas = useCallback((areas = []) => updateAreas(
        areas.reduce((o, area, index) => ({ 
            ...o, 
            [`area_${index}`]: {
                ...area,
                id: `area_${index}`
            }
        }), {})
    ), [updateAreas]);

    const initCards = useCallback((cards = []) => updateCards(
        cards.reduce((o, card, index) => ({ 
            ...o,
            [`card_${index}`]: {
                ...card,
                id: `card_${index}`
            }
        }), {})
    ), [updateCards]);

    const AreaElements = useMemo(() => (
        () => (
            Object.values(areas).map((area) => (
                <StickyArea
                    key={area.id}
                    area={area}
                />
            ))
        )
    ), [areas]);

    const echoArea = (areaId, card) => {
        const area = getBounds(areaId);
        const xDiff = Math.abs((area.x + area.width / 2) - (card.x + card.width / 2));
        const yDiff = Math.abs((area.y + area.height / 2) - (card.y + card.height / 2));

        return (xDiff <= area.width / 2) && (yDiff <= area.height / 2);
    };

    const echoAll = (areaId, card) => {
        Object.keys(areas).forEach((id) => {
            if (echoArea(id, card)) {
                areaId = id;
            }
        })

        return areaId;
    };

    const CardElements = useMemo(() => (
        ({ stageWrapper = { offset: zeroPoint, height: zeroPoint } }) => (
            Object.values(cards).map(({ id, areaId, cardId }) => (
                <CardWrapper 
                    key={id}
                    id={id}
                    areaId={areaId} 
                    stageWrapper={stageWrapper}
                >
                    <Card 
                        cardSet={'default'} 
                        id={cardId} 
                    />
                </CardWrapper>
            ))
        )
    ), [cards]);

    const moveCards = ({
        items, from, to
    }) => {
        if (from === to) return;
        
        removeFromAreaCards(items, from);

        addToAreaCards(items, to);

        updateCardsAreaId(items, to);
    }


    return {

        // Init controls

        initAreas,
        initCards,

        // Areas controls

        getAreas,
        AreaElements,
        echoArea,
        echoAll,

        // Cards controls

        getCards,
        CardElements,
        moveCards,
    }
}

export default useStageControls;