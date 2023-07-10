import React from "react";
import { useUpdateRouteData } from "../context/routeContext";

const RouteCard = ({
    route
}) => {
    const { label, key, logo } = route;
    const updateRoute = useUpdateRouteData();

    return (
        <button 
            className='route-card border-ghost px-6 py-8 bg-opacity-20 bg-slate-600 hover:glitch'
            onClick={() => updateRoute(key)}
        >
            <div className="w-32 h-32 mb-5">
                {logo && <img className="w-full h-full rounded-lg border-none" src={logo} alt="" />}
            </div>
            <div>
                {label}
            </div>
        </button>
    )
}

export default RouteCard;