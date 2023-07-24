import { useAreas, useUpdateAreas } from "../context/areasContext";
import { useUpdateCards } from "../context/cardsContext";

const useMove = () => {
    const updateCards = useUpdateCards();
    const updateAreas = useUpdateAreas();
    const areas = useAreas();

    const updateCardsAreaId = (items, areaId) => (
        updateCards(state => {
            const result = { ...state };
            items.forEach(id => result[id].areaId = areaId);
            return result;
        })
    );

    const pushToAreaCardIds = (items, areaId) => (
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

    const cutFromAreaCards = (items, id) => (
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

    const moveCards = ({
        items, from, to
    }) => {
        if (from === to) return;
        if (!items) items = areas[from].cardIds;
        
        cutFromAreaCards(items, from);
        pushToAreaCardIds(items, to);
        updateCardsAreaId(items, to);
    }

    return { moveCards };
}

export default useMove;