import React, { useContext, useState } from 'react';
import '../Assets/Styles/Navbar.css'
import { NavLink } from 'react-router-dom'
import ManageLocalStorage from '../CommonServices/ManageLocalStorage';
import { StateDetails } from '../Core/Context';

const Navbar = () => {

    const stateDetails = useContext(StateDetails)



    const handleNav = () => {
        console.log('LogedOut')
    }

    return (
        <>
            <div className='nav-container'>
                <div className='nav-left'>
                    <NavLink to='/home' className='links' >
                        Home
                    </NavLink>
                    <NavLink to='/profile' className='links' >
                        Profile
                    </NavLink>
                    <NavLink to='/favourites' className='links'>
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
