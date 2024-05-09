import { Navigate } from 'react-router-dom';
import Login from '@/pages/login';
import Memorandum from '@/pages/memorandum';
import Notes from '@/pages/notes';
import LinkList from '@/pages/linkList';
import Calculator from '@/pages/calculator';
import RemoteFiles from '@/pages/remoteFiles';
import Home from '@/pages/home';
import Layout from '@/pages/layout';
import Employee from '@/pages/employee';
import AddPage from '@/pages/employee/addPage';
import AMap from '@/aMap/MapContainer'

export const Routers = [
    {
        path: '/',
        element: <Navigate to="/layout" />
    },
    {
        path: 'layout',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'employee',
                element: <Employee />

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
            {
                path: 'employee/add',
                element: <AddPage />
            },
            {
                path: 'aMap',
                element: <AMap />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }

];