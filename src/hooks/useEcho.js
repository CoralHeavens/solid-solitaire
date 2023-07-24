import { areaGap } from "../constants/cardEngine";
import { useAreas } from "../context/areasContext";
import getBounds from "../helpers/getBounds";

const useEcho = () => {
    const areas = useAreas();

    const echoArea = (clickX, clickY, areaId) => {
        const cardsAmount = areas[areaId].cardIds.length;
        const { x: startX, y: startY, width, height } = getBounds(areaId);

        const endX = startX + width + areaGap.x * cardsAmount;
        const endY = startY + height + areaGap.y * cardsAmount;

        return (
            clickX >= startX && 
            clickX <= endX && 
            clickY >= startY && 
            clickY <= endY
        );
    }

    const echoAll = (clickX, clickY, areaId) => {
        Object.keys(areas).forEach((id) => {
            if (echoArea(clickX, clickY, id)) {
                areaId = id;
            }
        })

        return areaId;
    }

    return echoAll;
}

export default useEcho;