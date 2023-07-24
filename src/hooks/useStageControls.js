import { useAreas, useUpdateAreas } from "../context/areasContext";
import { useCards, useUpdateCards } from "../context/cardsContext";
import StickyArea from "../components/StickyArea";
import getBounds from "../helpers/getBounds";
import Card from "../components/Card";
import CardWrapper from "../components/CardWrapper";
import { areaGap, zeroPoint } from "../constants/cardEngine";
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
                id: `area_${index}`,
                cardIds: []
            }
        }), {})
    ), [updateAreas]);

    const initCards = useCallback((cards = []) => updateCards(
        cards.reduce((o, card, index) => {
            updateAreas(state => ({
                ...state,
                [card.areaId]: {
                    ...state[card.areaId],
                    cardIds: [
                        ...state[card.areaId].cardIds, 
                        `card_${index}`
                    ]
                }
            }))

            return { 
                ...o,
                [`card_${index}`]: {
                    ...card,
                    id: `card_${index}`
                }
            }
        }, {})
    ), [updateCards, updateAreas]);

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

    const echoArea = (clickX, clickY, areaId) => {
        const cardsAmount = areas[areaId].cardIds.length;
        const { x: startX, y: startY, width, height } = getBounds(areaId);

        const endX = startX + width + areaGap.x * cardsAmount;
        const endY = startY + height + areaGap.y * cardsAmount;

        return (
            clickX >= startX && 
            clickX <= endX && 
            clickY >= startY && 
            clickY <= endY
        );
    };

    const echoAll = (clickX, clickY, areaId) => {
        Object.keys(areas).forEach((id) => {
            if (echoArea(clickX, clickY, id)) {
                areaId = id;
            }
        })

        return areaId;
    };

    const CardElements = useMemo(() => (
        ({ stageWrapper = { offset: zeroPoint, height: zeroPoint } }) => (
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