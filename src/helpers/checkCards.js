export const checkSequence = (array, key = 'weight') => {
    let isSequence = true;
    array.reduce((prev, value) => {
        if (value[key] - prev !== 1) {
            isSequence = false;
        }
        return value[key];
    }, 0)
    return isSequence;
}

export const checkSame = (array, key = 'category') => {
    let isSame = true;
    array.reduce((prev, value) => {
        if (value[key] !== prev) {
            isSame = false;
        }
        return value[key];
    }, array[0][key]);
    return isSame;
}

export const checkCardSet = (cardIds, setLength, allItems, presets) => {
    const cards = cardIds.map(id => allItems[id]).map(({ cardType }) => presets[cardType]);

    // Check set length
    if (cards.length !== setLength) return false;

    // Check set category
    if (!checkSame(cards)) return false;

    // Check set sequence
    if (!checkSequence(cards.reverse())) return false;

    return true;
}