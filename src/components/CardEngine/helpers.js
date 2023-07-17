const getMin = (a, b) => a <= b ? a : b;

const getMax = (a, b) => a >= b ? a : b;

export const alignOffsetToBorder = ({
    size, offset, cardOffset,
}) => (
    offset > (size / 2) 
        ? getMin(size - cardOffset, offset) 
        : getMax(offset, 0)
)