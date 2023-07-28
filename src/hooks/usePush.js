import { useCallback } from "react";
import { useAreas, useUpdateAreas } from "../context/areasContext";
import { useCards, useUpdateCards } from "../context/cardsContext";

const usePush = () => {
    const updateAreas = useUpdateAreas();
    const updateCards = useUpdateCards();
    const globalAreas = useAreas();
    const globalCards = useCards();
    const areasAmount = Object.keys(globalAreas).length;

    const generateAreas = ({
        newAreas = [], 
        initialId = 0
    }) => (
        newAreas.reduce((o, area, index) => {
            const id = `area_${initialId + index}`;
            return { 
                ...o, 
                [id]: {
                    ...area,
                    id,
                    cardIds: []
                }
            }
        }, {})
    );

    const generateCards = useCallback(({
        newCards = [], 
        initialId = 0, 
        randomDistribution, 
        equalDistribution,
        callback = () => {}
    }) => {
        return newCards.reduce((o, card, index) => {
            const id = `card_${initialId + index}`;
            const areaId = (
                card.areaId ? card.areaId :
                randomDistribution ? `area_${Math.floor(Math.random() * areasAmount)}` :
                'area_0'
            );

            callback(areaId, id);

            return { 
                ...o,
                [id]: {
                    ...card,
                    areaId,
                    id
                }
            }
        }, {})
    }, [areasAmount])

    const pushAreas = useCallback((newAreas = []) => {
        updateAreas(state => (
            {
                ...state,
                ...generateAreas({
                    newAreas, 
                    initialId: Object.keys(state).length - 1
                })
            }
        ))
    }, [updateAreas]);

    const pushCards = useCallback(
        (newCards = [], randomDistribution = false, equalDistribution = false) => {
        updateCards(state => (
            {
                ...state,
                ...generateCards({
                    newCards, 
                    initialId: Object.keys(state).length - 1, 
                    randomDistribution, 
                    equalDistribution,
                    callback: (areaId, cardId) => {
                        updateAreas(state => {
                            const cardIds = state[areaId]?.cardIds ?? [];
                            return {
                                ...state,
                                [areaId]: {
                                    ...state[areaId],
                                    cardIds: [
                                        ...cardIds, 
                                        cardId
                                    ]
                                }
                            }
                        })
                    }
                })
            }
        ))
    }, [updateCards, updateAreas, generateCards]);

    const initialPush = useCallback(({
        newAreas, 
        newCards, 
        randomDistribution, 
        equalDistribution
    }) => {
        let areas = globalAreas, cards = globalCards;
        if (areasAmount === 0) {
            areas = generateAreas({ newAreas });
        } else if (Object.keys(cards).length === 0) {
            cards = generateCards({
                newCards,
                randomDistribution,
                equalDistribution,
                callback: (areaId, cardId) => {
                    areas[areaId].cardIds.push(cardId);
                },
            })
        }

        updateAreas(areas);
        updateCards(cards);
    }, [updateAreas, updateCards, generateCards, areasAmount, globalAreas, globalCards])

    return { pushAreas, pushCards, initialPush }
}

export default usePush;