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
    // ManageLocalStorage.set('currentUser', stateData.state.currentUser)
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
    let user_details = JSON.parse(ManageLocalStorage.get('userDetails'))
    setOnSubmit(true)
    if (loginIn(input.email, input.password, user_details)) {
      ManageLocalStorage.set('currentUser', input)
      let data = getUserDetails(input, user_details)
      stateData.dispatch({ type: ACTION.CURRENTUSER, payload: data })
      ManageLocalStorage.set('isLogin', true)
      stateData.dispatch({ type: ACTION.ISLOGIN, payload: true })
      setInput(initialState)
      setOnSubmit(false)
      stateData.navigate('/home')
    }else{
      setOnSubmit(false)
      stateData.dispatch({type: ACTION.FAILED, payload: 'Oops..! Invalid credentials...or User does not Exists'})
    }
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