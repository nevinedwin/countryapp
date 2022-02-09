import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import ManageLocalStorage from '../../CommonServices/ManageLocalStorage';
import { getUserDetails, loginIn, showValidation, validateEmail } from '../../CommonServices/services';
import ButtonWrapper from '../../Components/ButtonWrapper';
import TextInput from '../../Components/TextInput';
import { ACTION, StateDetails } from '../../Core/Context';
import './Login.css'

const Login = () => {

  const stateData = useContext(StateDetails)
  const initialState = {
    email: '',
    password: '',
    showPassword: false
  }


  useEffect(() => {
    ManageLocalStorage.set('currentUser', stateData.state.currentUser)
  }, [stateData])

  const [input, setInput] = useState(initialState)
  const [onSubmit, setOnSubmit] = useState(false)

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setInput(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const showPassword = () => {
    setInput(prevData => ({
      ...prevData,
      showPassword: !prevData.showPassword
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setOnSubmit(true)
    if (loginIn(input.email, input.password, JSON.parse(ManageLocalStorage.get('userDetails')))) {
      ManageLocalStorage.set('currentUser', input)
      let data = getUserDetails(input, JSON.parse(ManageLocalStorage.get('userDetails')))
      console.log('data', data);
      stateData.dispatch({ type: ACTION.CURRENTUSER, payload: data })
      console.log("Login sucess");
      setInput(initialState)
      setOnSubmit(false)
      stateData.navigate('/home')
    }
    console.log("login Fail");
  }

  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <div className='login-container'>
          <h3 className='signup-heading'>Login</h3>
          {onSubmit && showValidation(true, 'User Does not exists/ Password does not match')}
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
          </span>
          <ButtonWrapper type='submit' label='Submit' onClick={e => handleSubmit(e)} />
        </div>
      </form>
    </>
  )
};

export default Login;