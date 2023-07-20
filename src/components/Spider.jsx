import React, { useEffect } from "react";
import StageWrapper from "./StageWrapper";

const Spider = () => {
    useEffect(() => {
        global.stage.initAreas([
            {
                areaId: '0',
                positionModifier: {
                    x: 0.5,
                    y: 0,
                },
                cardIds: [
                    'card_0',
                    'card_1',
                ]
            },
            {
                areaId: '0',
                positionModifier: {
                    x: 2.5,
                    y: 0,
                },
                cardIds: [
                ]
            },
            {
                areaId: '0',
                positionModifier: {
                    x: 4.5,
                    y: 0,
                },
                cardIds: [
                ]
            },
            {
                areaId: '0',
                positionModifier: {
                    x: 6.5,
                    y: 0,
                },
                cardIds: [
                ]
            },
            {
                areaId: '0',
                positionModifier: {
                    x: 8.5,
                    y: 0,
                },
                cardIds: [
                ]
            }
        ]);

        global.stage.initCards([
            {
                cardId: '28',
                areaId: 'area_0'
            },
            {
                cardId: '29',
                areaId: 'area_0'
            }
        ]);
    }, [])

    return (
        <StageWrapper className={'field bg-slate-200'} />
    )
}

export default Spider;