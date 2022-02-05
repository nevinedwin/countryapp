import React from 'react'
import axios from 'axios'
import Validationcomponents from '../Components/Validationcomponents'

export const getCountryDetails = async () => {
    return axios.get('https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson')
}


export const validateEmail = (email, prevUsers)=>{
    let flag = 0
    const regx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-z]{2,5}$/
    if(regx.test(String(email).toLowerCase())){
       prevUsers.map(eachUser=>{
           if(eachUser.email === email){
               flag = 1
           }
       })
    }
    if(flag === 0){
        return true
    }
}

export const validateUsername = (username)=>{
    const regx = /^[a-zA-Z0-9]+$/
    return regx.test(String(username))
}

export const validatePassword = (password)=>{
    const regx = /^[a-zA-Z0-9]{6,15}$/
    return regx.test(String(password))
}

export const showValidation =(isShow, message)=>{
    if(isShow ){
        return(
        <Validationcomponents isShow={isShow} message={message}/>
    )}return;    
}