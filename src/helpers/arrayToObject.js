import _ from "lodash";

export default function arrayToObject(array = [], key = 'id') {
    return (
        _.chain(array)
        .keyBy(key)
        .mapValues()
        .value()
    )
}