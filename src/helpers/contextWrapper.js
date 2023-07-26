import React from "react";
import { RouteContextStore } from "../context/routeContext";

const contextWrapper = (children) => (
    <RouteContextStore.Provider>
        {children}
    </RouteContextStore.Provider>
)

export default contextWrapper;