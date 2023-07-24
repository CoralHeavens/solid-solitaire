import { createContextStore } from "../helpers/createContextStore";
import { useContext } from "react";

export const CardsContextStore = createContextStore({});
export const useUpdateCards = () => useContext(CardsContextStore.DispatchContext);
export const useCards = () => useContext(CardsContextStore.State);