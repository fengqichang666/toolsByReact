import { useState } from 'react'
import './App.css'
import { ConfigProvider } from 'antd'
import { HashRouter, BrowserRouter, Router, Route, Routes } from "react-router-dom";
import GetRoutes from '@/router';
function App() {

    return (
        <>
            <BrowserRouter>
                {/* 渲染路由组件 */}
                <GetRoutes />
            </BrowserRouter>
        </>
    )
}

export default App
