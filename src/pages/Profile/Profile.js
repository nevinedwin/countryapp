import React, { useState, useEffect, useContext } from 'react'
import ManageLocalStorage from '../../CommonServices/ManageLocalStorage.js';
import { deleteYourAccount, getUserDetails, showValidation, updateBoth, updatePassword, updateUsername, validatePassword, validateUsername } from '../../CommonServices/services.js';
import ButtonWrapper from '../../Components/ButtonWrapper.js';
import Hoc from '../../Components/Hoc.js'
import TextInput from '../../Components/TextInput.js';
import { ACTION, StateDetails } from '../../Core/Context.js';
import './profile.css'

const Profile = () => {
    const stateDetails = useContext(StateDetails)
    const allUsers = JSON.parse(ManageLocalStorage.get('userDetails'))
    const currentUser = JSON.parse(ManageLocalStorage.get('currentUser'))
    let country = stateDetails.state.currentUser.country


    const initialValue = {
        email: currentUser !== null ? currentUser.email : '',
        username: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false
    }

    const [input, setInput] = useState(initialValue)
    const [paswordReset, setPasswordReset] = useState(false)
    const [onSubmit, setOnSubmit] = useState(false)
    const [showSuccesmsg, setShowSuccesmsg] = useState(false)
    const [usernameReset, setUsernameReset] = useState(false)
    const [countries, setCountries] = useState({})
    const [deleteAccount, setDeleteAccount] = useState(false)
    const [deleteMsg, setDeleteMsg] = useState(false)

    useEffect(() => {
        setCountries(stateDetails && stateDetails.state.currentUser.country)
    }, [stateDetails])


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
        e.preventDefault()
        const { name, value } = e.target
        setInput(prevdata => ({
            ...prevdata,
            [name]: value
        }))
    }

    const handleBalanceFunction = (data) => {
        ManageLocalStorage.set('userDetails', data)
        stateDetails.dispatch({ type: ACTION.CURRENTUSER, payload: getUserDetails(currentUser, data) })
        setInput(initialValue)
        setOnSubmit(false)
        setShowSuccesmsg(true)
        setTimeout(() => {
            setShowSuccesmsg(false)
            setPasswordReset(false)
            setUsernameReset(false)
        }, 1500)
    }

    const handleSubmit = (value) => {
        setOnSubmit(true)
        let data

        if (value === 'password') {
            data = updatePassword(input, allUsers)
            if (input.password === input.confirmPassword && input.password !== '' && validatePassword(input.password)) {
                handleBalanceFunction(data)
            }
        }
        if (value === 'username') {
            data = updateUsername(input, allUsers)
            if (input.username !== '' && validateUsername(input.username)) {
                handleBalanceFunction(data)
            }
        }
        if (value === 'both') {
            data = updateBoth(input, allUsers)
            if (input.username !== '' && validateUsername(input.username) && input.password === input.confirmPassword && input.password !== '' && validatePassword(input.password)) {
                handleBalanceFunction(data)
            }
        }
    }


    const handleCancel = () => {
        setOnSubmit(false)
        setInput(initialValue)
        setPasswordReset(false)
        setUsernameReset(false)

    }

    const handleDelete = () => {
        let newData = deleteYourAccount(currentUser, allUsers)
        ManageLocalStorage.set('userDetails', newData)
        stateDetails.dispatch({ type: ACTION.CURRENTUSER, payload: {} })
        setDeleteMsg(true)
        setTimeout(() => {
            setDeleteMsg(false)
            setDeleteAccount(false)
            stateDetails.navigate('./login')
        }, 1500);
    }

    return (
            <div className='profile-card'>
            <div className='left-card'>
                <h1>{stateDetails.state.currentUser.username}</h1>
                <div>
                    <h4 className='email-text'>Email : <span className='email-text-only'>{stateDetails.state.currentUser.email}</span></h4>
                </div>
                <div className='password-section'>
                    <h5 className='password-text' onClick={() => setUsernameReset(prevdata => !prevdata)}>Click Here for Change Display Name</h5>
                    <h5 className='password-text' onClick={() => setPasswordReset(prevdata => !prevdata)}>Click Here for Change Password</h5>
                    <p className='password-text' onClick={() => { setDeleteAccount(prevData => !prevData) }} >Click here to Delete your account</p>
                    {paswordReset && <div className='password-reseter'>
                        {showSuccesmsg && <small className='green'>Updated Data Succesfully Updated</small>}
                        {onSubmit && input.password !== input.confirmPassword && showValidation(true, 'Password Does not match')}
                        {onSubmit && !validatePassword(input.password) && showValidation(true, 'Invalid Password')}
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
                        </span>
                        {paswordReset && !usernameReset && <div className='save-button'>
                            <ButtonWrapper icon="pi pi-save" className="p-button-rounded p-button-success" onClick={() => handleSubmit('password')} />
                            <ButtonWrapper icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={handleCancel} />
                        </div>}
                    </div>}
                    {usernameReset &&
                        <div className='password-reseter'>
                            {usernameReset && showSuccesmsg && <small className='green'>Updated Data Succesfully Updated</small>}
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
                            <div className='save-button'>
                                <ButtonWrapper icon="pi pi-save" className="p-button-rounded p-button-success" onClick={() => { usernameReset && paswordReset ? handleSubmit('both') : handleSubmit('username') }} />
                                <ButtonWrapper icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={handleCancel} />
                            </div>
                        </div>
                    }
                    {deleteMsg && <small className='green'>Succesfully deleted your Account</small>}
                    {deleteAccount && !usernameReset && !paswordReset && <div className='delete-account'>
                    <p className='normal-mouse'>Delete your account</p>
                    <ButtonWrapper icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={handleDelete} />
                    <ButtonWrapper icon="pi pi-times" className="p-button-rounded p-button-success" onClick={() => setDeleteAccount(prevData => !prevData)} />
                </div>}
                </div>
            </div>
            <div>

            </div>
            <div className='right-card'>
                <h3 className='heading-profile'>Country Details</h3>
                <ul>
                  <li>{countries && countries.id} is the Id</li>
                  <li>Abbreviation of {countries && countries.altName} is {countries && countries.abbr3}</li>
                  <li>{countries && countries.altName} is situated in {countries && countries.continent} continent.</li>
                  <li>{countries && countries.distanceUnits} is the distance Unit.</li>
                  <li>{countries && countries.esriUnits} is the ESRIUnits.</li>
                  <h4>Currencies</h4>
                  <ul>
                    <li>{countries && countries.currencyCode} is the currency code.</li>
                    <li>{countries && countries.currencyName} is the currency name.</li>
                    <li>{countries && countries.currencySymbol} is the currency Symbol.</li>
                    <li className='last-iem'>{countries && countries.currencyFormat} is the currency Format.</li>
                  </ul>
                </ul>
            </div>
            </div>
    )
};

export default Hoc(Profile);
