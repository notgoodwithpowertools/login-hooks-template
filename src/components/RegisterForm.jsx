import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../utils/firebase.js'

import { saveUser } from '../utils/user-actions.js'

import '../css/LoginForm.css'
import MatInput from './MatInput.jsx'
import MatButton from './MatButton.jsx'


const RegisterForm = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState('false')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const isEmailValid = (emailTxt) => {

    return !!emailTxt.match(/.+@.+/);

  }

  const setEmailandName = (emailTxt) => {

    setEmail(emailTxt)
    setValidEmail(isEmailValid(emailTxt))
    setName(emailTxt.split("@")[0])

  }

  const onRegisterEmail = (e) => {

    e.preventDefault()
    console.log("registerUser:", email + " password:", password + " name:", name)
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      // console.log("Register User Result Email:", result.user.email)
      // console.log("Register User Result UID:", result.user.uid)
      // console.log("Register User Registration worked...", result)
      saveUser(result.user, name)

    }, (error) => {

      console.log("Unable to register", error)
      setMessage(error.message)

    });

  }

  const disableButton = () => {

    return (validEmail && (password !== "")) ? false : true

  }

  return (

    <>
      <div className="loginFormMain">
      <p>Register</p>

      <MatInput value={email} onChange={setEmailandName} onFocus={setMessage} type={"email"} label={"Email"} required />
      <MatInput value={name} onChange={setName} label={"Name"} type="text" />
      <MatInput value={password} onChange={setPassword} onFocus={setMessage} type={"password"} label={"Password"} required />
      <MatButton text={"Register"} onClick={onRegisterEmail} disabled={disableButton()} />
      <Link className="lpLink" to='/login'>Back to login</Link>

      <div className="loginFormItem message">
          {message}
        </div>
      </div>
    </>

  )

}

export { RegisterForm as default }
