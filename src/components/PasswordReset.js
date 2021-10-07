import React, {useState, useEffect} from "react";
import fire from "../fire.js"
import { Link } from 'react-router-dom';

const PasswordReset = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handlePasswordReset = () => {
        fire.auth()
        .sendPasswordResetEmail(email).then(function(){
            window.alert("Password reset link sent to email")
        })
        .catch(err =>{
            switch(err.code){
              case "auth/operation-not-allowed":
              case "auth/invalid-email":
                setEmailError(err.message);
                break;
              }
    
            });
    }

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
          if(user)
          {
            setUser(user);
          }
  
          else
          {
            setUser('');
          }
        
        });
      };
  
      useEffect(() => {
        authListener();
      }, []);
    
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
                <div className = "btnContainer">
                <>
                <button onClick={handlePasswordReset}>Reset Password</button>
                </>
                </div>
                <Link to="/"><p>Return to Login</p></Link>
            </div>

        </section>
    )
}

export default PasswordReset;