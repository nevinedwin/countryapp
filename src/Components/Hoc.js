import React, { useContext, useEffect, useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import '../Assets/styles/hoc.css'
import { StateDetails } from '../core/context';

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
