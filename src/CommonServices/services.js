import axios from 'axios'
import Validationcomponents from '../Components/Validationcomponents'

export const getCountryDetails = async () => {
    return axios.get('https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson')
}


export const validateEmil = (email)=>{
    const regx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-z]{2,5}$/
    return regx.test(String(email).toLowerCase());
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