import React, { useContext } from 'react'
import logo from '../logo.svg'
import '../App.css'

import { AuthContext } from '../context/AuthContext.js'

const CRA = ( props ) => {

  const { userAuth } = useContext(AuthContext)
  console.log("CRA contextValues:", userAuth)

  let location = props.location
  let match = props.match
  
  return (

    <div className="App">
      <header className="App-header">
        <h3>Location: {location.pathname}</h3>
        <h3>Match path: {match.path}</h3>
        <h3>Exact match: {match.isExact.toString()}</h3>
        <h4>Context User id:<pre>{userAuth.uid}</pre></h4>
        
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

export { CRA as default }
