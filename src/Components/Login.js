import React, {useState} from 'react';
import { firestore } from '../services/firebase';

export default ({handleSignIn}) => {
    const md5 = require('md5')
    const [currentUser, setCurrentUser] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newName, setNewName] = useState("");
    const [hospital, setHospital] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState(false);

    const handleEmailChange = (e) => {
        if(e.target.value) {
            setEmail(e.target.value);
        } else {
            setEmail("");
        }
    }

    const handlePasswordChange = (e) => {
        if(e.target.value) {
            setPassword(e.target.value);
        } else {
            setPassword("");
        }
    }

    const handleNewNameChange = (e) => {
        if(e.target.value) {
            setNewName(e.target.value);
        } else {
            setNewName("");
        }
    }

    const handleHospitalChange = (e) => {
        if(e.target.value) {
            setHospital(e.target.value);
        } else {
            setHospital("");
        }
    }

    const handleNewEmailChange = (e) => {
        if(e.target.value) {
            setNewEmail(e.target.value);
        } else {
            setNewEmail("");
        }
    }

    const handleNewPasswordChange = (e) => {
        if(e.target.value) {
            setNewPassword(e.target.value);
        } else {
            setNewPassword("");
        }
    }

    const addDoctor = (e) => {
        
        firestore.collection('doctors').add({
            name: newName,
            hospital: hospital,
            email: newEmail,
            password: md5(newPassword),
        })

        setNewEmail("")
        setNewPassword("")
        setCurrentUser(true)
    }

    const login = (e) => {
        
        firestore.collection('doctors').where("email","==",email).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const passwd = doc.data().password;
                if(passwd === md5(password)) {
                    handleSignIn();
                } else {
                    setError(true);
                    setEmail("");
                    setPassword("");
                }
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <> 
            <div className="login-div">
                <div className="login-form">
                    {currentUser && (
                        <>
                            <h2>Sign In</h2>
                            <div className="login-form__item">
                                <input className="login-form__input" value={email} placeholder="Email" onChange={handleEmailChange}/>
                            </div>
                            <div className="login-form__item">
                                <input className="login-form__input" value={password} placeholder="Password" type="password" onChange={handlePasswordChange}/>
                            </div>
                            <span id="file-upload-btn" className="btn" onClick={login}>Submit</span>
                            {error && <div className="login-form__error">Incorrect username or password!!</div>}
                            <div className="login-form__signup">New User? <button className="signup-button" onClick={() => {setCurrentUser(false)}}>Sign Up</button></div>
                        </>    
                    )}
                    
                    {currentUser || (
                        <>
                            <h2>Sign Up</h2>
                            <div className="login-form__item">
                                <input className="login-form__input" value={newName} placeholder="Name" onChange={handleNewNameChange}/>
                            </div>
                            <div className="login-form__item">
                                <input className="login-form__input" value={hospital} placeholder="Hospital" onChange={handleHospitalChange}/>
                            </div>
                            <div className="login-form__item">
                                <input className="login-form__input" value={newEmail} placeholder="Email" onChange={handleNewEmailChange}/>
                            </div>
                            <div className="login-form__item">
                                <input className="login-form__input" value={newPassword} placeholder="Password" type="password" onChange={handleNewPasswordChange}/>
                            </div>
                            <span id="file-upload-btn" className="btn" onClick={addDoctor}>Submit</span>
                            <div className="login-form__signup">Already have an account? <button className="signup-button" onClick={() => {setCurrentUser(true)}}>Sign In</button></div>
                        </>
                    )}
                </div>
            </div>
            
        </>
    )
}