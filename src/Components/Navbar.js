import React, { useContext, useEffect, useState } from 'react';
import '../Assets/Styles/Navbar.css'
import { NavLink, useLocation } from 'react-router-dom'
import { ACTION, StateDetails } from '../Core/Context';
import {ImMenu} from 'react-icons/im'
import ManageLocalStorage from '../CommonServices/ManageLocalStorage';

const Navbar = () => {

    const stateDetails = useContext(StateDetails)
    const location = useLocation()

    const [check, setCheck] = useState('')

    useEffect(()=>{
        setCheck(location.pathname)
    },[location.pathname])

    const handleNav = () => {
        stateDetails.dispatch({type: ACTION.CURRENTUSER, payload: {}})
        stateDetails.dispatch({type: ACTION.FAVOURITES, payload: []})
        ManageLocalStorage.set('isLogin', false)
        stateDetails.dispatch({ type: ACTION.ISLOGIN, payload: false })
        ManageLocalStorage.set('currentUser', {})
        stateDetails.navigate('./login')
    }

    const handleSidebar =()=>{
        stateDetails.dispatch({type: ACTION.SHOWSIDEBAR})
    }

    return (
        <>
            <div className='nav-container'>
                <ImMenu className='menu-icon' onClick={handleSidebar}/>
                <div className='nav-left'>
                    <NavLink to='/home' className={check === '/home' ? 'high-links': 'links'} >
                        Home
                    </NavLink>
                    <NavLink to='/profile'  className={check === '/profile' ? 'high-links': 'links'} >
                        Profile
                    </NavLink>
                    <NavLink to='/favourites'  className={check === '/favourites' ? 'high-links': 'links'}>
                        Favourites
                    </NavLink>
                </div>
                <div className='nav-right'>
                    <div to='/home' className='links' onClick={() => handleNav()}>
                        Logout
                    </div>
                </div>
            </div>
        </>
    )
};

export default Navbar;
