import { createContextStore } from "../helpers/createContextStore";
import { useContext } from "react";

export const PresetsContextStore = createContextStore({
    key: 'default',
    data: require(`../data/cardSets/default.json`),
    compareWeights: true,
});
export const useUpdatePresets = () => useContext(PresetsContextStore.DispatchContext);
export const usePresets = () => useContext(PresetsContextStore.State);