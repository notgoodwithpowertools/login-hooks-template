import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../utils/firebase.js'

import { AuthContext } from '../context/AuthContext.js'
import { setLocalStorage } from '../utils/localStorage.js'

import '../css/LoginForm.css'

import MatInput from './MatInput.jsx'
import MatButton from './MatButton.jsx'

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState('false')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const { authDispatch } = useContext(AuthContext)

  const isEmailValid = (emailTxt) => {
    return !!emailTxt.match(/.+@.+/);
  }

  const updateEmail = (emailTxt) => {
    setEmail(emailTxt)
    setValidEmail(isEmailValid(emailTxt))
  }

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

  const disableButton = () => {

    return (validEmail && (password !== "")) ? false : true

  }

  return (
    <>
      <div className="loginFormMain">
        <p className="loginFormItem">Login</p>

        <MatInput value={email} onChange={updateEmail} onFocus={setMessage} type={"email"} label={"Email"} required />
        <MatInput value={password} onChange={setPassword} onFocus={setMessage} type={"password"} label={"Password"} required/>
        <MatButton text={"Login"} onClick={onLoginEmail} disabled={disableButton()} />
        <div className="loginFormItem">
          <Link className="lpLink" to='/register'>Register</Link>
        </div>
        <div className="loginFormItem message">
          {message}
        </div>
      </div>
    </>
  )

}

export { LoginForm as default }
