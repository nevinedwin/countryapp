import Favourites from '../pages/Favourites/Favourites'
import Home from '../pages/Home/Home'
import MainPage from '../pages/mainPage/MainPage'
import Profile from '../pages/Profile/Profile'


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
        path: '/profile',
        component: Profile
    },
    {
        path: '/favourites',
        component: Favourites
    },
    {
        path: '/*',
        component: MainPage
    }
]