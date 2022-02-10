import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import '../Assets/Styles/sidebar.css'
import { continentList } from '../CommonServices/services';
import { ACTION, StateDetails } from '../Core/Context';

const Sidebar = (props) => {

    const stateDetails = useContext(StateDetails)

    const [continents, setContinents] = useState([])
    const [show, setShow] = useState(true)


    useEffect(() => {
        if (continents.length === 0) {
            let listOfContinents = continentList(stateDetails.state.countryDetails)
            setContinents(listOfContinents)
        }
        setShow(stateDetails.state.showSidebar)
    }, [stateDetails])

    const selectContinent = (continentName) => {
        stateDetails.dispatch({ type: ACTION.CONTINENT, payload: continentName })
        stateDetails.navigate('./home')
    }

    return (
        <>
            {show && <div className='sidebar'>
                    <div className='Logo'>
                        <h3 className='logo-text'>COUNTRY<br />APP</h3>
                    </div>
                    <div className='continent-list ' >
                        {continents.map(eachContinent => {
                            return (
                                <div key={eachContinent} className={stateDetails.state.continent === eachContinent ? 'inital-select' : 'each-continent'} onClick={() => selectContinent(eachContinent)}>
                                    {eachContinent}
                                </div>
                            )
                        })}
                    </div>
                </div>}
        </>
       
    )
};

export default Sidebar;
