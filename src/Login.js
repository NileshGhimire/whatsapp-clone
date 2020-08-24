/* eslint-disable no-empty-pattern */
import React from 'react'
import './Login.css';
import {Button} from '@material-ui/core';
import {auth,provider} from "./firebase"
import {actionTypes} from './reducer';
import {useStateValue} from './StateProvider';
function Login() { 
    const [{},dispatch] = useStateValue();
    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispatch({
            type:actionTypes.SET_USER,
            user: result.user,
        });
    })
        .catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="login_container">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fneurogadget.net%2Fwp-content%2Fuploads%2F2016%2F10%2FWhatsApp-Big-Security-Concerns-Whats-all-about.jpg&f=1&nofb=1" alt="Login"></img>
            
            <div className="login_text">
                <h1>Sign in to Whatsapp</h1>
            </div>
            <Button onClick={signIn} >Sign in With Google
            </Button>
            </div>
        </div>
    )
}
export default Login
