import React from 'react';

const Login = (props) => {
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
        passwordError,
    } = props;
    return(
        <div className="loginPageContainer">
        <div className="titleTextContainer">
                <h1>ClAud-IO</h1>
                <h2>Create. Share.</h2>
        </div>
        <section className="login">
            <div className = "loginContainer">
                <label>Email</label>
                <input type="text" 
                autoFocus 
                required 
                value = {email} 
                onChange={e => setEmail(e.target.value)}/>
                <p className = "errorMsg">{emailError}</p>
                {hasAccount ? (
                    <>
                    <label>Password</label>
                    <input type ="password"
                    required
                    value ={password}
                    onChange = {(e) => setPassword(e.target.value)}/>
                    </>
                    ):
                    (
                    <>
                    <label>Password</label>
                    <input type ="password"
                    required
                    value ={password}
                    onChange = {(e) => setPassword(e.target.value)}/>
                    <label>Re-type Password</label>
                    <input type ="password"
                    required
                    value ={confirmPassword}
                    onChange = {(e) => setConfirmPassword(e.target.value)}/>
                    </>
                    )}
                <p className = "errorMsg">{passwordError}</p>
                <div className = "btnContainer">
                    {hasAccount ? (
                        <>
                        <button className="login-button" onClick={handleLogin}>Login</button>
                        <p>
                            Don't have an account ?
                            <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
                        </p>
                        </>
                    ) : (
                        <>
                        <button className="login-button" onClick={handleSignup}>Create Account</button>
                        <p>
                            Have an account ?
                            <span onClick = {() => setHasAccount(!hasAccount)}>Login!</span>
                        </p>
                        </>
                    )}
                </div>
            </div>

        </section>
        </div>
    )
}

export default Login;