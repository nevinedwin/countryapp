import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageLocalStorage from '../commonServices/manageLocalStorage';
import { getCountryDetails, getUserDetails } from '../commonServices/services';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StateDetails = React.createContext()

const initialValue = {
    countryDetails: [],
    currentUser: {},
    continent: 'Africa',
    favourites: [],
    showSidebar: true,
    toastValue : '',
    isLogin : false
}

export const ACTION = {
    COUNTRYDETAILS : 'countryDetails',
    CURRENTUSER : 'currentUser',
    CONTINENT : 'continent',
    FAVOURITES : 'favourites',
    FAVOURITESADD : 'favouritesAdd',
    SHOWSIDEBAR : 'showSidebar',
    SUCCESS: 'sucessToast',
    FAILED : 'errorToast',
    ISLOGIN : 'isLogin'
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
        case 'isLogin':
            return{
                ...state,
                isLogin : action.payload
            }
    }
}

const StateProvider = ({ children }) => {

    const navigate = useNavigate()

    const [state, dispatch] = useReducer(reducer, initialValue)

    console.log(state)


    useEffect(() => {
        state.isLogin && state.countryDetails.length === 0 && getCountryDetails().then(res => {
            dispatch({ type: ACTION.COUNTRYDETAILS, payload: res.data.countries })
        })
        dispatch({type: ACTION.CONTINENT, payload : "Africa"})
        let data = getUserDetails(ManageLocalStorage.get('currentUser') ? JSON.parse(ManageLocalStorage.get('currentUser')): {}, ManageLocalStorage.get('userDetails') ? JSON.parse(ManageLocalStorage.get('userDetails')): {})
        data && dispatch({ type: ACTION.CURRENTUSER, payload: data })

        let fav = ManageLocalStorage.get('allFavourites') ?  JSON.parse(ManageLocalStorage.get('allFavourites')): {}
        let curUser = ManageLocalStorage.get('currentUser') ? JSON.parse(ManageLocalStorage.get('currentUser')).email : {}
        if(fav !== null){
            dispatch({type: ACTION.FAVOURITES, payload: fav[curUser] ? fav[curUser] : []})
        }
        let loginStatus = ManageLocalStorage.get('isLogin')
        loginStatus && dispatch({type: ACTION.ISLOGIN, payload: JSON.parse(loginStatus)})
    }, [])

    useEffect(()=>{
        state.isLogin && state.countryDetails.length === 0 && getCountryDetails().then(res => {
            dispatch({ type: ACTION.COUNTRYDETAILS, payload: res.data.countries })
        })
        let loginStatus = ManageLocalStorage.get('isLogin')
        loginStatus && dispatch({type: ACTION.ISLOGIN, payload: JSON.parse(loginStatus)})
    }, [state.isLogin])


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
