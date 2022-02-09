import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../Assets/Styles/hoc.css'

let cont = ''

const Hoc = (Component) => (props) => {

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
