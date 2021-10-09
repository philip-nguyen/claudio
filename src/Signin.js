import React, {useState, useEffect} from 'react';
import Login from "./components/Login"
import PasswordReset from "./components/PasswordReset"

const Signin = (props) => {
    const{
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props;
    const [isReset, setIsReset] = useState(false);

    const setReset = (val) => {
        setIsReset(val);
    };

    return(
        <div className="loginPageContainer">
        <div className="titleTextContainer">
                <h2>ClAud-IO</h2>
                <h3>Create. Share.</h3>
        </div>
        {isReset ? (
            <PasswordReset
            isReset = {isReset}
            setIsReset = {setIsReset}
            setReset = {setReset}
          />

        ) : (

        <Login
        email = {email}
        setEmail = {setEmail}
        password = {password}
        setPassword = {setPassword}
        confirmPassword = {confirmPassword}
        setConfirmPassword = {setConfirmPassword}
        handleLogin = {handleLogin}
        handleSignup = {handleSignup}
        hasAccount = {hasAccount}
        setHasAccount = {setHasAccount}
        emailError = {emailError}
        passwordError={passwordError}
        isReset = {isReset}
        setIsReset = {setIsReset}
        setReset = {setReset}
      />

        )}
        
        </div>
    )
}

export default Signin;