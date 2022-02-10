import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../Assets/Styles/hoc.css'
import { StateDetails } from '../Core/Context';

let cont = ''

const Hoc = (Component) => () => {

    return (
        <div className='dashboard-container'>
            <Sidebar />
            <div className='dashboard-content'>
                <Navbar />
                <div className='dashboard-main-content'>
                    <Component />
                </div>
            </div>
        </div>
    )
};

export default Hoc;
