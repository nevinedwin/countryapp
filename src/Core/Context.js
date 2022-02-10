import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageLocalStorage from '../CommonServices/ManageLocalStorage';
import { getCountryDetails, getUserDetails } from '../CommonServices/services';

export const StateDetails = React.createContext()

const initialValue = {
    countryDetails: [],
    currentUser: {},
    continent: 'Africa',
    favourites: [],
    showSidebar: true
}

export const ACTION = {
    COUNTRYDETAILS : 'countryDetails',
    CURRENTUSER : 'currentUser',
    CONTINENT : 'continent',
    FAVOURITES : 'favourites',
    FAVOURITESADD : 'favouritesAdd',
    SHOWSIDEBAR : 'showSidebar'
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'countryDetails':
            return {
                ...state,
                countryDetails: action.payload
            }
        case 'currentUser':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'continent':
            return {
                ...state,
                continent: action.payload
            }
        case 'favourites':
            return {
                ...state,
                favourites: action.payload
            }
        case 'favouritesAdd':
            return {
                ...state,
                favourites: [...state.favourites, action.payload]
            }
        case 'showSidebar':
            return{
                ...state,
                showSidebar : !state.showSidebar
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
        let data = getUserDetails(JSON.parse(ManageLocalStorage.get('currentUser')), JSON.parse(ManageLocalStorage.get('userDetails')))
        dispatch({ type: ACTION.CURRENTUSER, payload: data })

        let fav = JSON.parse(ManageLocalStorage.get('favourites'))
        fav !== null && dispatch({ type: ACTION.FAVOURITES, payload: fav })
    }, [])

    return (
        <>
            <StateDetails.Provider value={{ state: state, dispatch: dispatch, navigate: navigate }}>
                {children}
            </StateDetails.Provider>
        </>
    )
};

export default StateProvider;
