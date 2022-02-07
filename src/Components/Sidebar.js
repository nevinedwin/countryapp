import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import '../Assets/Styles/sidebar.css'
import { continentList } from '../CommonServices/services';
import { StateDetails } from '../Core/Context';

const Sidebar = () => {

    const stateDetails = useContext(StateDetails)
    // console.log('stateDetailas', stateDetails);
    
    const [continents, setContinents] = useState([])
    const [clicked, setClicked] = useState(false)
    const [selectedContinent, SetSelectedContinent] = useState(continents[0])
    
    useEffect(() => {
        if(continents.length === 0){
            let listOfContinents = continentList(stateDetails.state.countryDetails)
            setContinents(listOfContinents)
        }
    }, [stateDetails])

    const selectContinent =(continent)=>{
        console.log(continent)
        setClicked(true)
    }
    
    return (
        <div className='sidebar'>
            <div className='Logo'>
                <h3>COUNTRY<br/>APP</h3>
            </div>
            <div className= 'continent-list ' >
                {continents.map(eachContinent=>{
                    return(
                        <div key={eachContinent} className='each-continent' onClick={()=>selectContinent(eachContinent)}>
                            {eachContinent}
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default Sidebar;
