import React from 'react';
import '../Assets/Styles/Navbar.css'
import {NavLink} from 'react-router-dom'

const Navbar = () => {

    const handleNav = (item)=>{
        console.log(item);
    }

    return (
        <>
            <div className='nav-container'>
                <div className='nav-left'>
                    <NavLink to='/home' className='links' >
                        Home
                    </NavLink>
                    <NavLink to='/profile' className='links'>
                        Profile
                    </NavLink>
                    <NavLink to='/home' className='links' >
                        Favourites
                    </NavLink>
                </div>
                <div className='nav-right'>
                    <NavLink to='/home' className='links' onClick={()=>handleNav('Logout')}>
                        Logout
                    </NavLink>
                </div>
            </div>
        </>
    )
};

export default Navbar;
