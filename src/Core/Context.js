import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageLocalStorage from '../CommonServices/ManageLocalStorage';
import { getCountryDetails, getUserDetails } from '../CommonServices/services';

export const StateDetails = React.createContext()

const initialValue = {
    countryDetails: [],
}

export const ACTION = {
    COUNTRYDETAILS: 'countryDetails',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'countryDetails':
            return {
                ...state,
                countryDetails: action.payload
            }
    }
}

const StateProvider = ({ children }) => {

    const navigate = useNavigate()
    
    const [state, dispatch] = useReducer(reducer, initialValue)

    useEffect(() => {
        state.countryDetails.length === 0 && getCountryDetails().then(res => {
            dispatch({ type: ACTION.COUNTRYDETAILS, payload: res.data.countries })
        })
    }, [] )

    return (
        <>
            <StateDetails.Provider value={{ state: state, dispatch: dispatch, navigate: navigate }}>
                {children}
            </StateDetails.Provider>
        </>
    )
};

export default StateProvider;
