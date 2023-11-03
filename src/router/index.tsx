import React, { ReactElement, lazy } from 'react'
import { Navigate, RouteObject, createBrowserRouter, redirect, useRoutes } from 'react-router-dom';
import Login from '@/pages/login';
import Memorandum from '@/pages/memorandum';
import Notes from '@/pages/notes';
import LinkList from '@/pages/linkList';
import Calculator from '@/pages/calculator';
import RemoteFiles from '@/pages/remoteFiles';
import Home from '@/pages/home';
import Layout from '@/pages/layout';
const GetRoutes = () => {
    const routes: React.ReactNode = useRoutes([
        {
            path: '/',
            element: <Navigate to='/layout' />
        },
        {
            path: '/layout',
            element: <Layout />,
            children: [
                {
                    element: <Home />,
                    index: true
                },
                {
                    path: 'memorandum',
                    element: <Memorandum />
                },
                {
                    path: 'notes',
                    element: <Notes />
                },
                {
                    path: 'linkList',
                    element: <LinkList />
                },
                {
                    path: 'calculator',
                    element: <Calculator />
                },
                {
                    path: 'remoteFiles',
                    element: <RemoteFiles />
                },
            ]
        },
        // {
        //     path: '/login',
        //     element: <Login />
        // },

    ])
    return routes;
}
export default GetRoutes