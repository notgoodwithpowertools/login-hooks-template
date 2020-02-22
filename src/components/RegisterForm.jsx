import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../utils/firebase.js'

import { saveUser } from '../utils/user-actions.js'

const RegisterForm = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const onRegisterEmail = (e) => {

    e.preventDefault()
    console.log("registerUser:", email + " password:", password + " name:", name)
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      console.log("Register User Result Email:", result.user.email)
      console.log("Register User Result UID:", result.user.uid)
      console.log("Register User Registration worked...", result)
      saveUser(result.user, name) // Add User info to databases

    }, (error) => {

      console.log("Unable to register", error)
      setMessage(error.message)

    });

  }

  const clearMessage = (e) => {
    setMessage('')
  }


  return (
    <>
      <p>Register</p>

      <input value={email} type="email" placeholder="Email" onChange={(e) => {
        setEmail(e.target.value)
        setName(e.target.value.split("@")[0])
        console.log("Name:", name)
      }} onFocus={(e) => clearMessage('')} />
      <input value={name} type="text" placeholder="User Name" onChange={(e) => setName(e.target.value)} />
      <input value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} onFocus={(e) => clearMessage('')} />
      <button onClick={onRegisterEmail} >
        Register
        </button>
      <Link className="lpLink" to='/login'>Back to login</Link>
      <p>{message}</p>


    </>
  )

}

export { RegisterForm as default }
