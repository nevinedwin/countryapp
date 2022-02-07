import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import ManageLocalStorage from '../../CommonServices/ManageLocalStorage.js';
import { getUserDetails, showValidation, updateDetails, validatePassword, validateUsername } from '../../CommonServices/services.js';
import ButtonWrapper from '../../Components/ButtonWrapper.js';
import Hoc from '../../Components/Hoc.js'
import TextInput from '../../Components/TextInput.js';
import { StateDetails } from '../../Core/Context.js';
import './profile.css'

const Profile = () => {
    const stateDetails = useContext(StateDetails)
    const allUsers = JSON.parse(ManageLocalStorage.get('userDetails'))
    const currentUser = JSON.parse(ManageLocalStorage.get('currentUser'))

    const initialValue = {
        email : currentUser.email,
        username : '',
        password : '',
        confirmPassword : '',
        showPassword : false,
        showConfirmPassword : false
    }

    const [user, setUser] = useState({})
    const [input, setInput] = useState(initialValue)
    const [paswordReset, setPasswordReset] = useState(false)
    const [onSubmit, setOnSubmit] = useState(false)
    const [showSuccesmsg, setShowSuccesmsg] = useState(false)
    const [usernameReset, setUsernameReset] = useState(false)
    const [lastRender, setLastRender] = useState(false)

    useEffect(()=>{
        let userData = getUserDetails(currentUser, allUsers)
        setUser(userData)
    }, [stateDetails, lastRender])

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

    const handleChange = (e)=>{
        e.preventDefault()
        const {name, value} = e.target
        setInput(prevdata=>({
            ...prevdata,
            [name] : value
        }))
    }

    const handleSubmit =(username)=>{
        setOnSubmit(true)
        if(username && validateUsername(input.username) || input.password === input.confirmPassword && input.password !== '' && validatePassword(input.password)){
            ManageLocalStorage.set('userDetails',updateDetails(input, allUsers))
            setInput(initialValue)
            setOnSubmit(false)
            setShowSuccesmsg(true)
            setTimeout(()=>{
                setShowSuccesmsg(false)
                setPasswordReset(false)
                setUsernameReset(false)
            },1500)
            setLastRender(true)
        }
    }
    const handleCancel = ()=>{
        setOnSubmit(false)
        setInput(initialValue)
        setPasswordReset(false)
        setUsernameReset(false)

    }

  return (
      <div className='profile-card'>
          <div className='left-card'>  
            <h1>{user.username}</h1>
            <div>
                <h4 className='email-text'>Email : {user.email}</h4>
            </div>
            <div className='password-section'>
                <h5 className='password-text' onClick={()=>setUsernameReset(prevdata => !prevdata)}>Click Here for Change Display Name</h5>
                <h5 className='password-text' onClick={()=>setPasswordReset(prevdata => !prevdata)}>Click Here for Change Password</h5>
                {paswordReset && <div className='password-reseter'>
                    {showSuccesmsg && <small className='green'>Updated Data Succesfully Updated</small>}
                    {onSubmit && input.password !== input.confirmPassword && !validatePassword(input.password) && showValidation(true, 'Password Does not match')}
                    {onSubmit && input.password === '' && showValidation(true, 'password is empty')}
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
                        <ButtonWrapper icon="pi pi-save" className="p-button-rounded p-button-success"  onClick={()=>handleSubmit(false)}/>
                        <ButtonWrapper icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={handleCancel}/>
                    </div>}
                </div>}
                {usernameReset && 
                <div className='password-reseter'>
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
                        <ButtonWrapper icon="pi pi-save" className="p-button-rounded p-button-success"  onClick={()=>handleSubmit(true)}/>
                        <ButtonWrapper icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={handleCancel}/>
                    </div>
                </div>
                }
            </div>
          </div>
          <div>

          </div>
          <div className='right-card'>

          </div>
      </div>
  )
};

export default Hoc(Profile);
