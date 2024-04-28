import React from 'react'
import { useRoutes } from 'react-router-dom';
import { Routers } from './RoutesList';

const GetRoutes = () => {
    const routes: React.ReactNode = useRoutes(Routers)
    return routes;
}
export default GetRoutes