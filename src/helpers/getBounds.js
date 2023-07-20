import { zeroPoint } from "../constants/cardEngine";

const getBounds = (id) => {
    const element = document.getElementById(id);
    if (element) {
        return element.getBoundingClientRect();
    } else {
        return zeroPoint
    }
};

export default getBounds;