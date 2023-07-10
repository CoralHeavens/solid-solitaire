import React from "react";
import Spider from "../components/Spider";
import Catalogue from "../components/Catalogue";
import Scarf from "../components/Scarf";

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
        logo: require('../img/spider.webp'),
    },
    scarf: {
        label: 'Scarf',
        key: 'scarf',
        component: <Scarf />,
        logo: require('../img/scarf.jpg'),
    }
}

export const baseRoute = routes.catalogue;

export default routes;