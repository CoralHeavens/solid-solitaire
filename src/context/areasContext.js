import { createContextStore } from "../helpers/createContextStore";
import { useContext } from "react";

export const AreasContextStore = createContextStore({});
export const useUpdateAreas = () => useContext(AreasContextStore.DispatchContext);
export const useAreas = () => useContext(AreasContextStore.State);