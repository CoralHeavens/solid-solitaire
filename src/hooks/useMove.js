import { useAreas, useUpdateAreas } from "../context/areasContext";
import { useCards, useUpdateCards } from "../context/cardsContext";
import { usePresets } from "../context/presetsContext";

const useMove = () => {
    const updateCards = useUpdateCards();
    const updateAreas = useUpdateAreas();
    const areas = useAreas();
    const cards = useCards();
    const { data: presets, compareWeights: useWeight } = usePresets();

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

    const compareCards = ({
        fromId, toId, key
    }) => {
        if (!(fromId && toId && key)) return true;

        const fromCard = presets[cards[fromId].cardType];
        const toCard = presets[cards[toId].cardType];

        const isKey = fromCard[key] === toCard[key];

        if (!useWeight) return isKey;
        const isWeight = toCard.weight - fromCard.weight === 1;

        return isKey && isWeight;
    }

    const moveCards = ({
        items, from, to, key
    }) => {
        if (from === to) return;
        if (!items) items = areas[from].cardIds;

        const isAppliable = compareCards({
            fromId: items[0],
            toId: areas[to].cardIds.at(-1),
            key
        });

        if (isAppliable) {
            cutFromAreaCards(items, from);
            pushToAreaCardIds(items, to);
            updateCardsAreaId(items, to);
        }

        return isAppliable;
    }

    return { moveCards };
}

export default useMove;