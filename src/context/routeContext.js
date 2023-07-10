import storageKeys from "../constants/storageKeys";
import { createContextStore } from "../helpers/createContextStore";
import { useContext } from "react";

export const RouteContextStore = createContextStore(localStorage.getItem(storageKeys.currentRoute));
export const useUpdateRouteData = () => useContext(RouteContextStore.DispatchContext);
export const useRouteData = () => useContext(RouteContextStore.State);