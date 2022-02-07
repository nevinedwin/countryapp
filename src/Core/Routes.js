import Home from '../pages/Home/Home'
import MainPage from '../pages/mainPage/MainPage'


export const routes = [
    {
        path: '/login',
        component: MainPage
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/*',
        component: MainPage
    }
]