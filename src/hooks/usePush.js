import { useCallback } from "react";
import { useUpdateAreas } from "../context/areasContext";
import { useUpdateCards } from "../context/cardsContext";

const usePush = () => {
    const updateAreas = useUpdateAreas();
    const updateCards = useUpdateCards();

    const pushAreas = useCallback((newAreas = []) => {
        updateAreas(state => (
            {
                ...state,
                ...newAreas.reduce((o, area, index) => {
                    const id = `area_${Object.keys(state).length + index}`;
                    return { 
                        ...o, 
                        [id]: {
                            ...area,
                            id,
                            cardIds: []
                        }
                    }
                }, {})
            }
        ))
    }, [updateAreas]);

    const pushCards = useCallback((newCards = []) => {
        updateCards(state => (
            {
                ...state,
                ...newCards.reduce((o, card, index) => {
                    const id = `card_${Object.keys(state).length + index}`
                    updateAreas(state => ({
                        ...state,
                        [card.areaId]: {
                            ...state[card.areaId],
                            cardIds: [
                                ...state[card.areaId].cardIds, 
                                id
                            ]
                        }
                    }))
        
                    return { 
                        ...o,
                        [id]: {
                            ...card,
                            id
                        }
                    }
                }, {})
            }
        ))
    }, [updateCards, updateAreas]);

    return { pushAreas, pushCards }
}

export default usePush;