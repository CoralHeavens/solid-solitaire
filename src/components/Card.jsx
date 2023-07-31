import React, { useMemo } from "react";
import useWindow from "../hooks/useWindow";

const Card = ({
    card
}) => {
    const { label, category } = card;

    const { width } = useWindow();
    const mainStyle = {
        fontSize: width * 0.05
    }
    const subStyle = {
        fontSize: width * 0.025
    }

    const sign = useMemo(() => (
        <img 
            src={require(`../data/default/sign/${category}.svg`)} 
            className="pointer-events-none"
            width={width * 0.02} 
            height={width * 0.02}
            alt=''
        />
    ), [category, width]);

    return (  
        <div className="bg-white w-full h-full flex justify-between items-center flex-col rounded-lg overflow-hidden no-pointer-children pb-1.5">
            <div className='flex w-full justify-start items-center px-1.5 gap-1' style={subStyle}>
                {sign}
                {label}
            </div>
            <div style={mainStyle}>
                {label}
            </div>
            <div className='flex w-full justify-end items-center gap-1 px-1.5' style={subStyle}>
                {label}
                {sign}
            </div>
        </div>
    )
}

export default Card;