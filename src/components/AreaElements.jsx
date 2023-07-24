import React from "react";
import { useAreas } from "../context/areasContext";
import StickyArea from "./StickyArea";

const AreaElements = () => {
    const areas = useAreas();

    return (
        Object.values(areas).map((area) => (
            <StickyArea
                key={area.id}
                area={area}
            />
        ))
    )
}

export default AreaElements;