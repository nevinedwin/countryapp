import React, { useContext, useEffect, useState } from 'react';
import './SignUp.css'
import TextInput from '../../Components/TextInput'
import DropdownWrapper from '../../Components/Dropdown';
import ButtonWrapper from '../../Components/ButtonWrapper'
import { showValidation, validateEmail, validatePassword, validateUser, validateUsername } from '../../CommonServices/services';
import ManageLocalStorage from '../../CommonServices/ManageLocalStorage';
import { ACTION, StateDetails } from '../../Core/Context';


const SignUp = ({goToLogin}) => {

    const stateData = useContext(StateDetails)
    const countryList = stateData.state.countryDetails

    const initialvalue = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        showPassword: false,
        showConfirmPassword: false,
    }

    const [input, setInput] = useState(initialvalue)
    const [onSubmit, setOnSubmit] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(()=>{
        const allUsers = JSON.parse(ManageLocalStorage.get('userDetails'))
        if (allUsers !== null){
            setUserData(allUsers)
        }
    },[])

    useEffect(()=>{
        ManageLocalStorage.set('userDetails', userData)     
    },[onSubmit, userData])

    const showPassword = () => {
        setInput(prevData => ({
            ...prevData,
            showPassword: !prevData.showPassword
        }))
    }

    const showConfirmPassword = () => {
        setInput(prevData => ({
            ...prevData,
            showConfirmPassword: !prevData.showConfirmPassword
        }))
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        e.preventDefault()
        setInput(prevData => ({
            ...prevData,
            [name]: value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setOnSubmit(true)
        if(validateUser(input.email, userData)){
            if (validateUsername(input.username) && validateEmail(input.email) && validatePassword(input.password) && input.password === input.confirmPassword && input.country !== '') {
                setUserData(prevData=>({
                    ...prevData,
                    [input.email] : input
                }))
                setOnSubmit(false)
                stateData.dispatch({type: ACTION.SUCCESS, payload: 'Congratulations.! Successfully Registered'})
                setTimeout(() => {
                    goToLogin() 
                }, 400);
            }else{
                stateData.dispatch({type: ACTION.FAILED, payload: 'Oops..! You should fill all fields in the form...'})
            }
        }else{
            setOnSubmit(false)
            setInput(initialvalue)
            stateData.dispatch({type: ACTION.FAILED, payload: 'Oops..! User Already Exists..'})
        }
    }


    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>
                <div className='signup-container'>
                    <h3 className='signup-heading'>Register</h3>
                    <span className="p-float-label signup-input">
                        <TextInput
                            id='username'
                            value={input.username}
                            name='username'
                            type='text'
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor='username'>Username</label>
                        {onSubmit && !validateUsername(input.username) ? showValidation(true, 'Invalid Username') : showValidation(false)}
                    </span>
                    <span className="p-float-label signup-input">
                        <TextInput
                            id='email'
                            value={input.email}
                            name='email'
                            type='text'
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor='email'>Email</label>
                        {onSubmit && !validateEmail(input.email, stateData.state.userDetails) ? showValidation(true, 'Invalid Email/ Email already exists') : showValidation(false)}
                    </span>
                    <DropdownWrapper
                        className='signup-dropdown'
                        value={input.country}
                        options={countryList}
                        optionLabel='name'
                        name="country"
                        placeholder='Choose a Country'
                        onChange={(e) => handleChange(e)}
                    />
                    {onSubmit && input.country === '' && showValidation(true, 'Select your Country')}
                    <span className="p-float-label signup-input p-input-icon-right">
                        <i className={input.showPassword ? "pi pi-eye-slash cur" : "pi pi-eye cur"} onClick={showPassword} />
                        <TextInput
                            id='password'
                            value={input.password}
                            name='password'
                            type={input.showPassword ? 'text' : 'password'}
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor='password'>Password</label>
                        {onSubmit && !validatePassword(input.password) ? showValidation(true, 'Invalid Password.\nPassword should contains 8-15charchters, no special characters are allowed.') : showValidation(false)}
                    </span>
                    <span className="p-float-label signup-input p-input-icon-right">
                        <i className={input.showConfirmPassword ? "pi pi-eye-slash cur" : "pi pi-eye cur"} onClick={showConfirmPassword} />
                        <TextInput
                            id='confirmPassword'
                            value={input.confirmPassword}
                            name='confirmPassword'
                            type={input.showConfirmPassword ? 'text' : 'password'}
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        {onSubmit && validatePassword(input.password) && input.password !== input.confirmPassword ? showValidation(true, 'Password Does not Match') : showValidation(false)}
                    </span>
                    <ButtonWrapper type='submit' label='Submit' onClick={e => handleSubmit(e)} />
                </div>
            </form>
        </>
    )
};

export default SignUp;
