import React, { useContext, useEffect, useState } from 'react';
import './SignUp.css'
import TextInput from '../../Components/TextInput'
import DropdownWrapper from '../../Components/Dropdown';
import ButtonWrapper from '../../Components/ButtonWrapper'
import { CountryDetails } from '../../App'


const SignUp = () => {

    const countryData = useContext(CountryDetails)

    const initialvalue = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        showPassword: false,
        showConfirmPassword: false,
        countriesList: []
    }

    const [input, setInput] = useState(initialvalue)

    useEffect(() => {
        const countryList = countryData.map(eachCountry => {
            return eachCountry.name
        })
        setInput(prevData => ({
            ...prevData,
            countriesList: [countryData.map(eachCountry => {
                return eachCountry.name
            })]
        }))
    }, [])

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

    return (
        <>
            <form>
                <div className='signup-container'>
                    <h3 className='signup-heading'>Sign Up</h3>
                    <span className="p-float-label signup-input">
                        <TextInput
                            id='username'
                            value={input.username}
                            name='username'
                            type='text'
                            required
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor='username'>Username</label>
                    </span>
                    <span className="p-float-label signup-input">
                        <TextInput
                            id='email'
                            value={input.email}
                            name='email'
                            type='email'
                            required
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor='email'>Email</label>
                    </span>
                    <span className="p-float-label signup-input p-input-icon-right">
                        <i className={input.showPassword ? "pi pi-eye-slash" : "pi pi-eye"} onClick={showPassword} />
                        <TextInput
                            id='password'
                            value={input.password}
                            name='password'
                            type={input.showPassword ? 'text' : 'password'}
                            required
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor='password'>Password</label>
                    </span>
                    <span className="p-float-label signup-input p-input-icon-right">
                        <i className={input.showConfirmPassword ? "pi pi-eye-slash" : "pi pi-eye"} onClick={showConfirmPassword} />
                        <TextInput
                            id='confirmPassword'
                            value={input.confirmPassword}
                            name='confirmPassword'
                            type={input.showConfirmPassword ? 'text' : 'password'}
                            required
                            autoComplete='off'
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                    </span>
                    <DropdownWrapper value={input.country} />
                    <ButtonWrapper />
                </div>
            </form>
        </>
    )
};

export default SignUp;
