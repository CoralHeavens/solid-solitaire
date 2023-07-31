import { useEffect, useState } from "react";
import { useAreas, useUpdateAreas } from "../context/areasContext";
import { useCards, useUpdateCards } from "../context/cardsContext";
import { usePresets } from "../context/presetsContext";
import { checkCardSet } from "../helpers/checkCards";

const useMove = () => {
    const updateCards = useUpdateCards();
    const updateAreas = useUpdateAreas();
    const areas = useAreas();
    const cards = useCards();
    const { data: presets, compareWeights: useWeight } = usePresets();
    const [setsAmount, updateSets] = useState(0);

    useEffect(() => {
        if (setsAmount >= 8) {
            alert("You won!");
        }
    }, [setsAmount])

    const updateCardsAreaId = (items, areaId) => (
        updateCards(state => {
            const result = { ...state };
            items.forEach(id => result[id].areaId = areaId);
            return result;
        })
    );

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
        items, from, to, key, lockOnSet, setLength, callback = () => {}
    }) => {
        if (from === to) return;
        if (!items) items = areas[from].cardIds;

        const isAppliable = (!areas[from].isLocked && !areas[to].isLocked) && (
            compareCards({
                fromId: items[0],
                toId: areas[to].cardIds.at(-1),
                key
            })
        );

        if (isAppliable) {
            const localAreas = {...areas};

            const newCardIds = localAreas[from].cardIds.filter(cardId => items.indexOf(cardId) === -1);
            const isSet = checkCardSet(newCardIds, setLength, cards, presets);

            if (isSet) updateSets(state => state + 1);

            localAreas[from] = {
                ...localAreas[from],
                cardIds: newCardIds,
                isSet,
                isLocked: lockOnSet && isSet
            };
            localAreas[to] = {
                ...localAreas[to],
                cardIds: [
                    ...localAreas[to].cardIds,
                    ...items
                ]
            };
            updateAreas(localAreas);
            updateCardsAreaId(items, to);

            callback({
                from: areas[from],
                to: areas[to],
                items: items.map((id) => cards[id])
            })
        }

        return isAppliable;
    }

    return { moveCards };
}

export default useMove;