import { useState } from 'react'
import './App.css'
import { ConfigProvider } from 'antd'
import { HashRouter, BrowserRouter, Router, Route, Routes } from "react-router-dom";
import GetRoutes from '@/router';
import AuthRouter from './router/AuthRouter';
import { Routers as routers } from './router/RoutesList';

const App = () => {
    const RouteAuthFun = (routeList: any) => {
        return routeList.map((item: any,index:number) => {
            return (<Route key={index} path={item.path} element={
                <AuthRouter key={index} auth={item.auth}>
                    {item.element}
                </AuthRouter>
            }>
                {item?.children && RouteAuthFun(item.children)}
            </Route>)
        })
    }
    return <BrowserRouter><Routes>{RouteAuthFun(routers)}</Routes></BrowserRouter>
    // return (
    //     <>
    //         <BrowserRouter>
    //             {/* 渲染路由组件 */}
    //             <GetRoutes />
    //         </BrowserRouter>
    //     </>
    // )
}

export default App
