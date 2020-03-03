import React, { useContext } from 'react'

import logo from '../logo.svg'
import '../App.css'

import { UserContext } from '../context/UserContext.js'

const UserForm = ( props ) => {

  const { user } = useContext(UserContext)
  // console.log("CRA UserContextValues:", user)

  let location = props.location
  let match = props.match
  
  return (

    <div className="App">
      <header className="App-header">
        <h3>Location: {location.pathname}</h3>
        <h3>Match path: {match.path}</h3>
        <h3>Exact match: {match.isExact.toString()}</h3>
        <h4>Context Userid:<pre>{user.uid}</pre></h4>
        <h4>Context Name:<pre>{user.name}</pre></h4>
        
        < img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Updated with React Hooks
        </a>
      </header>
    </div>

  )
}

export { UserForm as default }
