import { useCallback } from "react";
import { useAreas, useUpdateAreas } from "../context/areasContext";
import { useCards, useUpdateCards } from "../context/cardsContext";
import { usePresets } from "../context/presetsContext";

const usePush = () => {
    const updateAreas = useUpdateAreas();
    const updateCards = useUpdateCards();
    const globalAreas = useAreas();
    const globalCards = useCards();
    const areasAmount = Object.keys(globalAreas).length;
    const { data: presets } = usePresets();

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
                    cardIds: [],
                    isLocked: false,
                    isSet: false,
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
        const cards = newCards.reduce((o, card, index) => {
            const id = `card_${initialId + index}`;
            const areaId = (
                card.areaId ? card.areaId :
                randomDistribution ? `area_${Math.floor(Math.random() * areasAmount)}` :
                `area_${index}`
            );

            return { 
                ...o,
                [id]: {
                    ...card,
                    areaId,
                    id
                }
            }
        }, {});

        callback(cards);
        return cards;
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

    const pushToAreaCardIds = useCallback(({ items, lockOnSet, setLength }) => {
        if (items.length === 0) return;

        const localAreas = {...globalAreas};

        items.forEach((card) => {
            const areaId = card.areaId;
            const cardId = card.id ?? card;
            const area = localAreas[areaId];
            localAreas[areaId] = {
                ...area,
                cardIds: [
                    ...area?.cardIds ?? [],
                    cardId
                ]
            }
        })
        return localAreas;
    }, [presets, globalAreas]);

    const pushCards = useCallback(
        ({
            newCards = [], 
            randomDistribution = false, 
            equalDistribution = false, 
            lockOnSet, 
            setLength
        }) => {
            const localCards = generateCards({
                newCards, 
                initialId: Object.keys(globalCards).length, 
                randomDistribution,
                equalDistribution
            })
            const localAreas = pushToAreaCardIds({
                items: Object.values(localCards),
                lockOnSet,
                setLength
            });
            updateCards(state => ({
                ...state,
                ...localCards
            }));
            updateAreas(state => ({
                ...state,
                ...localAreas
            }));
        }, [updateCards, updateAreas, generateCards, pushToAreaCardIds]);

    const initialPush = useCallback(({
        newAreas, 
        newCards, 
        randomDistribution, 
        equalDistribution,
        lockOnSet,
        setLength
    }) => {
        if (areasAmount === 0) {
            updateAreas(generateAreas({ newAreas }));
        } else if (Object.keys(globalCards).length === 0) {
            const localCards = generateCards({
                newCards,
                randomDistribution,
                equalDistribution
            })
            updateCards(localCards);
            updateAreas(pushToAreaCardIds({
                items: Object.values(localCards),
                lockOnSet, 
                setLength
            }))
        }
    }, [updateAreas, updateCards, generateCards, areasAmount])

    return { pushAreas, pushCards, initialPush, pushToAreaCardIds }
}

export default usePush;