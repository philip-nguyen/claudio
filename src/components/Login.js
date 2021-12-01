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
        setReset
    } = props;
    return(
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
                        <button onClick={handleLogin}>Login</button>
                        <p>
                            Don't have an account ?
                            <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
                        </p>
                        </>
                    ) : (
                        <>
                        <button onClick={handleSignup}>Create Account</button>
                        <p>
                            Have an account ?
                            <span onClick = {() => setHasAccount(!hasAccount)}>Login!</span>
                        </p>
                        </>
                    )}
                    <p>
                        Forgot Password?
                        <span onClick = {() => setReset(true)}>Reset Password</span>
                    </p>
                </div>
            </div>

        </section>
    )
}

export default Login;