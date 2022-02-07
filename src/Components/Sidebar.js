import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import '../Assets/Styles/sidebar.css'
import { continentList } from '../CommonServices/services';
import { StateDetails } from '../Core/Context';

const Sidebar = () => {

    const stateDetails = useContext(StateDetails)

    const [continents, setContinents] = useState([])

    useEffect(() => {
        continents === [] && setContinents(continentList(stateDetails.state.countryDetails))
    }, [])

    return (
        <div className='sidebar'>
            {console.log(continents)}
        </div>
    )
};

export default Sidebar;
