import { shuffle } from "lodash";

export default function getShuffledBlankArray(array = [], mapper = (index) => index) {
    return shuffle(
        Array.from({
            length: array.length
        }).map((_, index) => mapper(index))
    )
}