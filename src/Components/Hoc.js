import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

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
