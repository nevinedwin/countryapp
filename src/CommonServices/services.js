import React from 'react'
import axios from 'axios'
import Validationcomponents from '../Components/Validationcomponents'

export const getCountryDetails = async () => {
    return axios.get('https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson')
}


export const validateEmail = (email, prevUsers) => {
    const regx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-z]{2,5}$/
    return (regx.test(String(email).toLowerCase()))
}

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
    allUsers.forEach(element => {
        if (element.email === email && element.password === password) {
            isLogin = true
            return isLogin
        }
    });
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

export const getUserDetails = (input, allUsers)=>{
    let user = {}
    allUsers.forEach(eachUser=>{
        if(eachUser.email == input.email){
            user = eachUser
        }
    })
    return user
}


export const updateDetails = (newData, oldData)=>{
    let data =  oldData.map(eacharray=>{
        if(eacharray.email === newData.email){
            if (eacharray.password !== newData.password && newData.password !== ''){
                if(eacharray.username !== newData.username && newData.username !== ''){
                    console.log("first");
                    return({...eacharray,
                        password : newData.password,
                        confirmPassword : newData.password,
                        username : newData.username
                    })
                }else{
                    console.log('second');
                    return({...eacharray,
                    password : newData.password,
                    confirmPassword : newData.password})
                }
            }else{
                    if(eacharray.username !== newData.username && newData.username !== ''){
                        console.log('third');
                        return({...eacharray,
                            username : newData.username
                        })
                    }
                }
        }else{
            return eacharray
        }
    })
    return data
}

export const showValidation = (isShow, message) => {
    if (isShow) {
        return (
            <Validationcomponents isShow={isShow} message={message} />
        )
    } return;
}