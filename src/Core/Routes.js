import Favourites from '../pages/Favourites/Favourites'
import Home from '../pages/Home/Home'
import MainPage from '../pages/mainPage/MainPage'
import Profile from '../pages/Profile/Profile'


export const routes = [
    {
        path: '/login',
        component: MainPage,
        isPrivate : false
    },   
    {
        path: '/',
        component: MainPage,
        isPrivate : false
    },
    {
        path: '/home',
        component: Home,
        isPrivate : true
    },
    {
        path: '/profile',
        component: Profile,
        isPrivate : true
    },
    {
        path: '/favourites',
        component: Favourites,
        isPrivate : true
    }
    ,
    {
        path: '*',
        component: MainPage,
        isPrivate : false
    },
    {
        path: '*',
        component: Home,
        isPrivate : true
    }
]