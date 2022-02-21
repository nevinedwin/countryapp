import React, { useContext } from 'react'
import { Navigate} from 'react-router-dom'
import { StateDetails } from './context'

export const AppRoute = ({path,component: Component}) => {

    const pathArray = ['/', '/login']

    const stateData = useContext(StateDetails)

    if(stateData.state.isLogin && (path=='/' || path=='/login')){
        return <Navigate to='/home'/>
    }else if (!stateData.state.isLogin && !pathArray.includes(path)){
        return <Navigate to={'/login'}/>
    }else{
        return <Component/>
    }
}
