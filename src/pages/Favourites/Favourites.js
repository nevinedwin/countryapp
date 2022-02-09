import React from 'react';
import { useContext } from 'react';
import Hoc from '../../Components/Hoc';
import { StateDetails } from '../../Core/Context';

const Favourites = () => {

    const stateDetails = useContext(StateDetails)

    return (
        <>
            { }
        </>
    )
};

export default Hoc(Favourites);
