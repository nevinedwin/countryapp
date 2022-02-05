import React, { useContext, useEffect, useState } from 'react';
import './SignUp.css'
import TextInput from '../../Components/TextInput'
import DropdownWrapper from '../../Components/Dropdown';
import ButtonWrapper from '../../Components/ButtonWrapper'
import { CountryDetails } from '../../App'
import { showValidation, validateEmil, validatePassword, validateUsername } from '../../CommonServices/services';


const SignUp = () => {

    const countryList = useContext(CountryDetails)

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
        console.log(input);
    }

    const selectCountry = (e)=>{
        e.preventDefault()
        setInput(prevData=>({
            ...prevData,
            country: e.target.value
        }))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        setOnSubmit(true)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='signup-container'>
                    <h3 className='signup-heading'>Sign Up</h3>
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
                        {onSubmit && !validateUsername(input.username) ? showValidation(true, 'Invalid Username'): showValidation(false)}
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
                        {onSubmit && !validateEmil(input.email) ? showValidation(true, 'Invalid Email'): showValidation(false)}
                    </span>
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
                        {onSubmit && !validatePassword(input.password) ? showValidation(true, 'Invalid Password.\nPassword should contains 8-15charchters, no special characters are allowed.'): showValidation(false)}
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
                        {onSubmit && validatePassword(input.password) && input.password !== input.confirmPassword ? showValidation(true, 'Password Does not Match'): showValidation(false)}
                    </span>
                    <DropdownWrapper  
                        value={input.country} 
                        option={countryList}
                        optionLabel='name'
                        name="country"
                        placeholder='Choose a Country'
                        onChange={(e)=>{selectCountry(e)}}
                         />
                    <ButtonWrapper type='submit'/>
                </div>
            </form>
        </>
    )
};

export default SignUp;
