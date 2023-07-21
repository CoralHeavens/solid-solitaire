import React from "react";
import { RouteContextStore } from "../context/routeContext";
import { CursorContextStore } from "../context/cursorContext";
import { CardsContextStore } from "../context/cardsContext";
import { AreasContextStore } from "../context/areasContext";

const contextWrapper = (children) => (
    <RouteContextStore.Provider>
        <CursorContextStore.Provider>
            <AreasContextStore.Provider>
                <CardsContextStore.Provider>
                    {children}
                </CardsContextStore.Provider>
            </AreasContextStore.Provider>
        </CursorContextStore.Provider>
    </RouteContextStore.Provider>
)

export default contextWrapper;