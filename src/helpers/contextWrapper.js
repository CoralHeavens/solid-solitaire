import React from "react";
import { RouteContextStore } from "../context/routeContext";
import { CursorContextStore } from "../context/cursorContext";

const contextWrapper = (children) => (
    <RouteContextStore.Provider>
        <CursorContextStore.Provider>
            {children}
        </CursorContextStore.Provider>
    </RouteContextStore.Provider>
)

export default contextWrapper;