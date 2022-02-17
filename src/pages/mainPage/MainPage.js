import React, { useReducer } from 'react';
import Login from '../Login/Login';
import SignUp from '../Signup/SignUp'
import { FaUser, FaEdit, FaLock } from 'react-icons/fa'
import './MainPage.css'

const ACTION = {
    LOGIN: 'login',
    SIGNUP: 'signup',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {
                ...state, clicked: {
                    login: 'apply',
                    signup: '',
                }
            }

        case 'signup':
            return {
                ...state, clicked: {
                    login: '',
                    signup: 'apply',
                }
            }
    }
}


const MainPage = () => {

    const initialState = {
        clicked: {
            login: 'apply',
            signup: '',
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const goToLogin = ()=>{
        dispatch({type: ACTION.LOGIN})
    }

    return (
        <div className='mainpage-container'>
            <h1 className='app-name'>COUNTRY APP</h1>
            <div className='mainpage-content-container'>
                <div className='mainpage-switches'>
                    <div className={`mainpage-button ${state.clicked.login}`} onClick={() => dispatch({ type: ACTION.LOGIN })}>
                        <FaUser className='user-icon' />
                        <h3 className='switch-text'>Login</h3>
                    </div>
                    <div className={`mainpage-button ${state.clicked.signup}`} onClick={() => dispatch({ type: ACTION.SIGNUP })}>
                        <FaEdit className='user-icon' />
                        <h3 className='switch-text'>Register</h3>
                    </div>
                </div>
                <div className='mainpage-content'>
                    {state.clicked.login !== '' && <Login />}
                    {state.clicked.signup !== '' && <SignUp goToLogin={goToLogin}/>}
                </div>
            </div>
        </div>
    )
};

export default MainPage;