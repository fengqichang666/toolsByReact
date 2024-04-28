import { useEffect } from 'react';
import {
    /*
    *
    matchRoutes,
    * */
    useNavigate
} from 'react-router-dom';
// import { Routers } from './RoutesList';


const unAuthRouter = ['/login', '/register'];
const AuthRouter = ({ children }: any) => {
    const Navigate = useNavigate();
    const token = localStorage.getItem('token') || '';
    // const mathchs = matchRoutes(Routers, location);
    // const isExist = mathchs?.some(item => {
    //     return item.pathname == location.pathname;
    // });
    useEffect(() => {
        if (token == '' && !unAuthRouter.includes(location.pathname)) {
            alert('token 失效，请重新登录');
            Navigate('/login');
        }
        // if (token && !isExist) {
        // if (location.pathname == '/' || location.pathname == '/login') {
        // Navigate('/404');
        // } else {
        //     // 如果是其他路由就跳到其他的路由;
        //     Navigate(location.pathname);
        // }

        // }
    }, [token, location.pathname]);
    return children;
};
export default AuthRouter;