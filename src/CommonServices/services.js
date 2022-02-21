import React from 'react'
import axios from 'axios'
import Validationcomponents from '../components/validationcomponents'

export const getCountryDetails = async () => {
    return axios.get('https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson')
}


export const validateEmail = (email) => {
    const regx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-z]{2,5}$/
    return (regx.test(String(email).toLowerCase()))
}

export const validateUser = (email, prevUsers) =>{
    if (prevUsers[email]){
        return false
    }else{
        return true
}}

export const validateUsername = (username) => {
    const regx = /^[a-zA-Z0-9]+$/
    return regx.test(String(username))
}

export const validatePassword = (password) => {
    const regx = /^[a-zA-Z0-9]{6,15}$/
    return regx.test(String(password))
}

export const loginIn = (email, password, allUsers) => {
    let isLogin = false
    if(email && password && allUsers[email]){
        if(allUsers[email].password === password){
            isLogin = true
        }
    }
    return isLogin
}


export const continentList = (array) => {
    const continents = []
    array.forEach(element => {
        if (!continents.includes(element.continent)) {
            continents.push(element.continent)
        }
    })
    return continents.sort()
}

export const getUserDetails = (input, allUsers) => {
    let user = {}
    let keyEmail = input.email
    if (allUsers !== null){
        if(allUsers[keyEmail] !== null){
            user = allUsers[keyEmail]
        }else{
            console.log('user Does not Exists')
        }
    } 
    return user
}


export const updatePassword = (newData, oldData) => {
    let currentUser = newData.email
    return( {
        ...oldData,
        [currentUser]: {
            ...oldData[newData.email],
            password : newData.password,
            confirmPassword : newData.password
        }
    })
}


export const updateUsername = (newData, oldData) => {
    let currentUser = newData.email
    return( {
        ...oldData,
        [currentUser]: {
            ...oldData[newData.email],
            username : newData.username
        }
    })
}

export const updateBoth = (newData, oldData) => {
    let currentUser = newData.email
    return( {
        ...oldData,
        [currentUser]: {
            ...oldData[newData.email],
            password : newData.password,
            confirmPassword : newData.password,
            username : newData.username
        }
    })
}

export const getCountriesByContinent = (continent, allContinent) => {
    let countries = []
    allContinent !== null && allContinent.forEach(eachdata => {
        if (eachdata.continent === continent) {
            countries.push(eachdata)
        }
    })
    return countries
}


export const deleteYourAccount = (currentUser, AllUser) => {
    delete AllUser[currentUser.email]
    return AllUser
}

export const removeArray = (arr, value) => {
    return arr.filter((eachElement) => {
        if (eachElement.id !== value) {
            return eachElement
        }
    })
}


export const checkValue = (arr, val) => {
    let flg = 1
    arr.forEach(eachElement => {
        if (eachElement.id === val) {
            flg = 0
        }
    })

    return flg
}

export const getCountriesById = (id, allCountries) => {
    let newVal = {}
    allCountries.forEach(eachElement => {
        if (eachElement.id === id) {
            newVal = eachElement
            return newVal
        }
    })
    return newVal
}

export const showValidation = (isShow, message) => {
    if (isShow) {
        return (
            <Validationcomponents isShow={isShow} message={message} />
        )
    } return;
}