import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

const Spider = () => {
    const [state, setState] = useState([
        { id: 1, name: "Card 1", suit: 'spades' },
        { id: 2, name: "Card 2", suit: 'spades' },
        { id: 3, name: "Card 3", suit: 'clubs' },
    ]);
    
    return (
        <section className="field bg-slate-200">
            <ReactSortable 
                animation={200} 
                list={state} 
                setList={setState}
                group='suit'
                className="flex gap-4 p-4"
            >
                {state.map((item) => (
                    <div className='cursor-pointer bg-slate-500' key={item.id}>{item.name}</div>
                ))}
            </ReactSortable>
        </section>
    )
}

export default Spider;