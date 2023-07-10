import React from "react";
import Spider from "../components/Spider";
import Catalogue from "../components/Catalogue";

const routes = {
    catalogue: {
        label: 'Catalogue',
        key: 'catalogue',
        component: <Catalogue />,
    },
    spider: {
        label: 'Spider',
        key: 'spider',
        component: <Spider />,
    }
}

export const baseRoute = routes.catalogue;

export default routes;