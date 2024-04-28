import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRouter from './router/AuthRouter';
import { Routers as routers } from './router/RoutesList';
import { Provider } from 'react-redux';
import store from '@/store';

const App = () => {
    const RouteAuthFun = (routeList: any) => {
        return routeList.map((item: any, index: number) => {
            console.log('22222');
            return (<Route key={index} path={item.path} element={
                <AuthRouter key={index} auth={item.auth}>
                    {item.element}
                </AuthRouter>
            }>
                {item?.children && RouteAuthFun(item.children)}
            </Route>);
        });
    };
    return <Provider store={store}><BrowserRouter><Routes>{RouteAuthFun(routers)}</Routes></BrowserRouter></Provider>;
    // return (
    //     <>
    //         <BrowserRouter>
    //             {/* 渲染路由组件 */}
    //             <GetRoutes />
    //         </BrowserRouter>
    //     </>
    // )
};

export default App;
