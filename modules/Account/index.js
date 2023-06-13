import React from 'react';
import Login from '../../components/Account/signin';
import Signup from '../../components/Account/signup';

export const Signin = () => {
    return  (
    // <div className='login-bg'>
    //     <Login/>
    // </div>

        <Login/>
    )
}

export const Register = () => {
    return <Signup/>
}