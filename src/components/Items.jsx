import React, { useContext, useEffect, useState } from 'react'

import { firestoreDB } from '../utils/firebase.js'

import AddItemForm from './AddItemForm.jsx'
import ItemsTablePanel from './ItemsTablePanel.jsx'

import logo from '../logo.svg'
import '../App.css'
// import '../ItemsTable.css'

import { AuthContext } from '../context/AuthContext.js'

const Items = (props) => {

  const { userAuth } = useContext(AuthContext)
  console.log("AuthContextValues:", userAuth)

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  // const [category, setCategory] = useState('mont-albert-road')

  let location = props.location
  let match = props.match
  let category = 'mont-albert-road'
  let year = '2018-2019'

  let queryPath = `items/${year}/${category}`
  console.log("queryPath:", queryPath)

  useEffect(() => {

    console.log("Items useEffect ... ")

    const itemsCollection = firestoreDB.collection(queryPath)

    const unsubscribe = itemsCollection.onSnapshot((docSnapshot) => {
      console.log("Snapshot ...")
      console.log("docSnapshot:", docSnapshot.docs)
      let parsedItems = []

      docSnapshot.docs.forEach((doc) => {

        parsedItems.push({
          id: doc.id,
          ...doc.data()
        })

      })
      setLoading(false)
      console.log('parsedItems:', parsedItems)
      setItems(parsedItems)

    })
    return () => {
      // Clean up the listener subscription
      console.log("Clean up the Items useEffect listener subscription...")
      unsubscribe();
    }
  }, [queryPath])

  return (
    <>

      <div className="App">
        <header className="App-header">
          <AddItemForm queryPath={queryPath} />
          {loading ? <div>Loading...</div> : <ItemsTablePanel items={items} queryPath={queryPath} />}
          <h3>Location: {location.pathname}</h3>
          <h3>Match path: {match.path}</h3>
          <h3>Exact match: {match.isExact.toString()}</h3>
          <h4>Context User id:<pre>{userAuth.uid}</pre></h4>

          < img src={logo} className="App-logo" alt="logo" />
          
        </header>
      </div>
    </>

  )
}

export { Items as default }
