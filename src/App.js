import React, {useState, useEffect} from "react";
import fire from "./fire"
import "./App.css";
import NavigationMenu from './components/NavigationMenu';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./Login";
import Compositions from './components/Compositions'
import Discover from './components/Discover'
import Home from './components/Home'
import Hero from "./Hero";
import Sequence from './components/Sequence';

const App = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const clearErrors =() => {
    setEmailError('');
    setPasswordError('');
  };
  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email,password)
      .catch(err =>{
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
          }

        });

    };
    const handleSignup = () => {
      clearErrors();
      if(password == confirmPassword)
      {
      fire
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .catch(err =>{
          switch(err.code){
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(err.message);
              break;
            case "auth/weak-password":
              setPasswordError(err.message);
            }
  
          });
        }
        else
        {
          setPasswordError("Passwords do not match");
        }
  
      };
    const handleLogout = () => {
      fire.auth().signOut();
    };

    const authListener = () => {
      fire.auth().onAuthStateChanged((user) => {
        if(user)
        {
          clearInputs();
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
    <div className ="App">
      {user ? (
        <Router>
        <NavigationMenu handleLogout = {handleLogout} />
        <Switch>
          <Route path='/Home' component={Home} />
          <Route path='/compositions' component={Compositions} />
          <Route path='/discover' component={Discover} />
          <Route path='/sequence' component={Sequence}/>
        </Switch>
      </Router>
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
      />
      )}
      </div>
  );
};

export default App;

