import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import './Login.css';
import firebaseConfig from './firebase.confic';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
      isSingedIn: false,
      newUser: false,
      name: '',
      email: '',
      password: '',
      error: '',
      photo: '',
      success: false
    })

    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
      }else {
        firebase.app();
      }
    const handleGoogleSingIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
      
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          const{displayName, email} = result.user;
          const singedInUser = {name: displayName, email}
          setLoggedInUser(singedInUser);
          history.replace(from);
          // ...
        }).catch((error) => {
          var email = error.email;
          var credential = error.credential;
          // ...
        });
    }
    const handleBlur = (event) => {
        let isFildValid = true;
        if (event.target.name === 'email'){
            isFildValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if(event.target.name === 'password'){
          const isPassworValid = event.target.value.length >= 6;
          const passwordHasNumber = /\d{1}/.test(event.target.value);
          isFildValid = isPassworValid && passwordHasNumber;
        }
        if(isFildValid){
          const newUserInfo = {...user};
          newUserInfo[event.target.name] = event.target.value;
          setUser(newUserInfo);
        }
      } 
    const handleSubmit = (event) => {
        // console.log(user.email, user.password)
        if(newUser && user.email && user.password){
         firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
         .then(res => {
             console.log(res)
             const newUserInfo = {...user};
             newUserInfo.error = '';
             newUserInfo.success = true;
             setUser(newUserInfo);
             upadateUserInfo(user.name);

        })
        .catch ( error => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);

        })
            
      }

      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log('sign in user info', res.user)
        })
          .catch( error => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
          });
        }
        event.preventDefault()
    }
    const upadateUserInfo = name => {
        const user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name,
        }).then(function() {
          console.log('user name updated')
          // Update successful.
        }).catch(function(error) {
          console.log(error)
          // An error happened.
        });
      }

    return (
        <div className="login">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    {newUser && <Form.Label>Name</Form.Label>}
                    {newUser && <Form.Control onBlur={handleBlur} type="text" placeholder="Enter name" />}
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleBlur} name="email" type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={handleBlur} name="password" type="password" placeholder="Password" /><br/>
                    <Form.Label>Re Type Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <input className="btn btn-success" type="submit" value={newUser ? 'Sing up' : 'Login'}/
                >
              <input className="btn btn-primary" type="submit" onClick={() => setNewUser(!newUser)} name="newUser" value="Registion"/>
            </Form>
            <div >
            <Button onClick={handleGoogleSingIn} variant="info">Google</Button>
         </div>
         <p style={{color: 'red'}}>{user.error}</p>
         {user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'login in succefull'} successfully</p>}
        </div>
    );
};

export default Login;