import React, { useMemo } from "react";

const Card = ({
    card
}) => {
    const { label, category } = card;

    const size = 24;

    const sign = useMemo(() => (
        <img 
            src={require(`../data/default/sign/${category}.svg`)} 
            className="pointer-events-none"
            width={size} 
            height={size}
            alt=''
        />
    ), [category]);

    return (  
        <div className="bg-white w-full h-full flex justify-between items-center flex-col rounded-lg">
            <div className='flex w-full justify-start px-1.5'>
                {sign}
                {label}
            </div>
            <div className='text-6xl'>
                {label}
            </div>
            <div className='flex w-full justify-end px-1.5'>
                {label}
                {sign}
            </div>
        </div>
    )
}

export default Card;