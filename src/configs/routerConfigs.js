import LoginPage from "../features/login/LoginPage";
import TTKTPage from "../features/ttkt/TTKTPage";


let nestedRoutes = [
    {
        key: 3,
        name: 'danhmuc',
        private: true,
        path:'/danhmuc',
        children:[
            {
                key: 4,
                name: 'donvi',
                path: '/dm_donvi',
                component: (props) => <h1>danh muc don vi</h1>,
                children: null
            }
        ]
    }
]

let routers = [
    {
        key:1,
        name: 'Login',
        private: false,
        path: '/',
        component:LoginPage,
        exact: true
    },
    {
        key: 2,
        name: 'ttkt',
        private: true,
        path:'/ttkt',
        component: TTKTPage,
        children: nestedRoutes,
        exact: false
    }
]

export {
    routers,
    nestedRoutes,
}