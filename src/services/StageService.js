import Card from "../components/Card";
import CardWrapper from "../components/CardWrapper";
import StickyArea from "../components/StickyArea";
import { zeroPoint } from "../constants/cardEngine";
import getBounds from "../helpers/getBounds";

class StageService {

    #spriteSet = 'default';
    #cards = {};
    #areas = {};

//  Stage ----------------------------------------------------------------

    initAreas = (areas = []) => {
        this.#areas = areas.reduce((o, area, index) => ({ 
            ...o, 
            [`area_${index}`]: {
                ...area,
                id: `area_${index}`
            }
        }), {});
    }

    initCards = (cards = []) => {
        this.#cards = cards.reduce((o, card, index) => ({ 
            ...o,
            [`card_${index}`]: {
                ...card,
                id: `card_${index}`
            }
        }), {});
    }

    setSpriteSet = (spriteSet) => {
        this.#spriteSet = spriteSet;
    }

//  Areas ----------------------------------------------------------------

    getAreas = () => this.#areas;

    getAreaElements = () => Object.values(this.#areas).map((area) => (
        <StickyArea
            key={area.id}
            area={area}
        />
    ));

    echoArea = (areaId, card) => {
        const area = getBounds(areaId);
        const xDiff = Math.abs((area.x + area.width / 2) - (card.x + card.width / 2));
        const yDiff = Math.abs((area.y + area.height / 2) - (card.y + card.height / 2));

        return (xDiff <= area.width / 2) && (yDiff <= area.height / 2);
    }

    echoAll = (areaId, card) => {
        Object.keys(this.#areas).forEach((id) => {
            if (this.echoArea(id, card)) {
                areaId = id;
            }
        })

        return this.#areas[areaId];
    }

//  Cards ----------------------------------------------------------------

    getCards = () => this.#cards;
    
    getCardElements = (stageWrapper = {
        offset: zeroPoint, size: zeroPoint
    }) => Object.values(this.#cards).map(({ id, areaId, cardId }) => (
        <CardWrapper 
            key={id}
            id={id}
            areaId={areaId} 
            stageWrapper={stageWrapper}
        >
            <Card 
                cardSet={this.#spriteSet} 
                id={cardId} 
            />
        </CardWrapper>
    ));

    moveCard = (cardId, fromId, toId) => {
        if (fromId === toId) return;
        
        // Removing from old area
        const cardIndex = this.#areas[fromId].cardIds.indexOf(cardId);
        this.#areas[fromId].cardIds.splice(cardIndex, 1);

        // Adding to new area if not added
        if (!this.#areas[toId].cardIds.find((value) => value === cardId)) {
            this.#areas[toId].cardIds.push(cardId);
        }

        // Updating area info of card
        this.#cards[cardId].areaId = toId;
    }
}

export default StageService;