import { zeroPoint } from "../constants/cardEngine";
import { createContextStore } from "../helpers/createContextStore";
import { useContext } from "react";

export const CursorContextStore = createContextStore(zeroPoint);
export const useUpdateCursorData = () => useContext(CursorContextStore.DispatchContext);
export const useCursorData = () => useContext(CursorContextStore.State);