import { zeroPoint } from "../constants/cardEngine";
import { createContextStore } from "../helpers/createContextStore";
import { useContext } from "react";

export const CursorContextStore = createContextStore({
    ...zeroPoint,
    hidden: false,
    cardIds: [],
});

export const useCursorData = () => useContext(CursorContextStore.State);
export const useUpdateCursorData = () => useContext(CursorContextStore.DispatchContext);