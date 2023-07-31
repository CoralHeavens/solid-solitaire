import React from "react";
import { AreasContextStore } from "../context/areasContext";
import { CardsContextStore } from "../context/cardsContext";
import { PresetsContextStore } from "../context/presetsContext";
import StageWrapper from "./StageWrapper";
import { CursorContextStore } from "../context/cursorContext";
import Cursor from "./Cursor";

const ReactCardEngine = ({ 
    className,
    cardClassName,
    areas,
    cards,
    handCards,
    cardsPresetKey,
    comparisonKey,
    compareWeights,
    stayVisible,
    showOnlyLast,
    freeMove,
    children,
    randomDistribution,
    equalDistribution,
    lockOnSet,
    setLength,
    onAreaUpdate,
}) => (
    <CursorContextStore.Provider>
        <AreasContextStore.Provider>
            <CardsContextStore.Provider>
                <PresetsContextStore.Provider>
                    <Cursor hide />
                    <StageWrapper
                        className={className}
                        areas={areas}
                        cards={cards}
                        handCards={handCards}
                        cardsPresetKey={cardsPresetKey}
                        comparisonKey={comparisonKey}
                        compareWeights={compareWeights}
                        stayVisible={stayVisible}
                        showOnlyLast={showOnlyLast}
                        freeMove={freeMove}
                        randomDistribution={randomDistribution}
                        equalDistribution={equalDistribution}
                        lockOnSet={lockOnSet}
                        setLength={setLength}
                        cardClassName={cardClassName}
                        onAreaUpdate={onAreaUpdate}
                    >
                        {children}
                    </StageWrapper>
                </PresetsContextStore.Provider>
            </CardsContextStore.Provider>
        </AreasContextStore.Provider>
    </CursorContextStore.Provider>
)

export default ReactCardEngine;