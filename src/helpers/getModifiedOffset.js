const getModifiedOffset = ({width, height}, {x, y}) => (
    {
        x: width * x,
        y: height * y
    }
)

export default getModifiedOffset;