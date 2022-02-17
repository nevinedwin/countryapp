import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageLocalStorage from '../CommonServices/ManageLocalStorage';
import { getCountryDetails, getUserDetails } from '../CommonServices/services';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StateDetails = React.createContext()

const initialValue = {
    countryDetails: [],
    currentUser: {},
    continent: 'Africa',
    favourites: [],
    showSidebar: true,
    toastValue : ''
}

export const ACTION = {
    COUNTRYDETAILS : 'countryDetails',
    CURRENTUSER : 'currentUser',
    CONTINENT : 'continent',
    FAVOURITES : 'favourites',
    FAVOURITESADD : 'favouritesAdd',
    SHOWSIDEBAR : 'showSidebar',
    SUCCESS: 'sucessToast',
    FAILED : 'errorToast'
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
        case 'sucessToast':
            return{
                ...state,
                toastValue : toast.success(action.payload)
            }
        case 'errorToast':
            return{
                ...state,
                toastValue : toast.error(action.payload)
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

        let fav = JSON.parse(ManageLocalStorage.get('allFavourites'))
        console.log('context')
        let curUser = JSON.parse(ManageLocalStorage.get('currentUser')).email
        if(fav !== null){
            dispatch({type: ACTION.FAVOURITES, payload: fav[curUser] ? fav[curUser] : []})
        }
    }, [])



    return (
        <>
            <StateDetails.Provider value={{ state: state, dispatch: dispatch, navigate: navigate }}>
                {children}
                <ToastContainer 
                    draggable={false}
                    autoClose={2000}
                    transition={Zoom}
                    position={'top-right'}
                />
            </StateDetails.Provider>
        </>
    )
};

export default StateProvider;
