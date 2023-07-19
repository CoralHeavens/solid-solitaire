const parseElements = (obj) => (
    Object.values(obj).map(({ element }) => element)
)

export default parseElements;