import React from "react";
import routes, { baseRoute } from "../constants/routes";
import RouteCard from "./RouteCard";

const title = 'Choose your solitaire:';

const Catalogue = () => {
    return (
        <main className='w-full flex flex-col items-center'>
            <h1 className="glitch uppercase text-5xl mb-14" title={title}>{title}</h1>
            <section className='w-full flex justify-center flex-wrap gap-8'>
                {Object.values(routes).map((route) => {
                    if (route.key === baseRoute.key) return null;
                    return <RouteCard route={route} key={route.key} />
                })}
            </section>
        </main>
    )
}

export default Catalogue;