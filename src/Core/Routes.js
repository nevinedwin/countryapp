import Favourites from '../pages/favourites/favourites'
import Home from '../pages/home/home'
import MainPage from '../pages/mainPage/mainPage'
import Profile from '../pages/profile/profile'


export const routes = [
    {
        path: '/login',
        component: MainPage
    },   
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/favourites',
        component: Favourites
    }
    ,
    {
        path: '*',
        component: MainPage
    },
    {
        path: '*',
        component: Home
    }
]