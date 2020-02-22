import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../utils/firebase.js'

import { AuthContext } from '../context/AuthContext.js'
import { setLocalStorage } from '../utils/localStorage.js'

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  
  const { authDispatch } = useContext(AuthContext)

  const onLoginEmail = (e) => {

    e.preventDefault()
    console.log("<LoginForm> OnLoginEmail... email:", email + ' , password:', password)
    
    firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
        
        console.log("Auth worked...", result)
        authDispatch({ type: 'LOGIN', uid: result.uid })
        setLocalStorage('loginType', 'email')
        return result

    }, (error) => {
        
        console.log("Auth error:", error)
        setMessage(error.message)
    
    })


  }

  const clearMessage = (e) => {

    setMessage('')
    console.log("On Focus - Message:", message)

  }

  return (
    <>
      <p>Login</p>

        <input value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} onFocus={(e) => clearMessage('')}/>
        <input value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} onFocus={(e) => clearMessage('')}/>
        
        <button onClick={onLoginEmail} >
          Login
        </button>
        
        <Link className="lpLink" to='/register'>Register here</Link>
        <p>{message}</p>

    </>
  )

}

export { LoginForm as default }
