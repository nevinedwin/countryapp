import React, { useEffect, useReducer } from 'react';
import ManageLocalStorage from '../CommonServices/ManageLocalStorage';
import { getCountryDetails } from '../CommonServices/services';

export const StateDetails = React.createContext()

const initialValue = {
    countryDetails: [],
    userDetails: [],
    currentUser: {}
}

export const ACTION = {
    COUNTRYDETAILS: 'countryDetails',
    USERDETAILS: 'userDetails',
    CURRENTUSER: 'currentUser'
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'countryDetails':
            return {
                ...state,
                countryDetails: action.payload
            }
        case 'userDetails':
            return {
                ...state,
                userDetails: [...state.userDetails, action.payload !== [] && action.payload]
            }
        case 'currentuser':
            return {
                ...state,
                currentUser: action.payload
            }

    }
}

const StateProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialValue)

    let allUsers

    useEffect(() => {
        // ManageLocalStorage.clear()
        state.countries === [] && getCountryDetails().then(res => (
            dispatch({ type: ACTION.COUNTRYDETAILS, payload: res.data.countries })
        ));

        allUsers = JSON.parse(ManageLocalStorage.get('userDetails'))
        allUsers !== [] && dispatch({ type: ACTION.USERDETAILS, payload: allUsers })
        console.log('first', state.userDetails);
    }, [])




    return (
        <>
            <StateDetails.Provider value={{ state: state, dispatch: dispatch }}>
                {children}
            </StateDetails.Provider>
        </>
    )
};

export default StateProvider;
