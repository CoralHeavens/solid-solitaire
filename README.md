### version 0.1.1 ###

## Info:
- Routing depends on localstorage info
- Drag and drop invokes by clicking on cards
- Drag position depends on cursor position

## Features:
- Game mode menu
- Drag and drop for cards
- Multiple drag and drop for moving more than one card at once
- Stage control via console

## Console controls:

- # clearStage()
    Removes all items;
    Retruns amount of items cleared.

- # addCard(

    # cardType:
        Index of card type in data/cardSets/default.json
        Type: string
        Default: '0'

    # areaId:
        Id of area where to push the card
        Type: string
        Default: first areaId available on stage
)
    Function:
        Adds new card on the stage
    Return:
        Message with card type and area Id

- # addArea(
    
    # areaType:
        Index of area type in data/areaSets/default.json
        Type: string
        Default: '0'
    
    # positionModifier:
        Multiplier for x/y values of area position calculated as x = width * multiplierX, y = height * miltiplierY
        Type: { x: number, y: number }
        Default: { x: 0, y: 0 }
)
    Function:
        Add new area on the stage
    Return:
        Message with area type

- # moveCard(
    
    # fromAreaId:
        Id of area from where card should be taken
        Type: string
        Default: first areaId available on stage
    
    # toAreaId:
        Id of area to which card should be put
        Type: string
        Default: first areaId available on stage
    
    # cardIds:
        Array of card ids that should be moved
        Type: [string]
        Default: All cards at 'fromAreaId' area
)
    Function:
        Move cards from one area to another
    Return:
        Message with amount of cards moved, from and to area ids