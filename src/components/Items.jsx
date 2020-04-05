import React, { useContext, useEffect, useState } from 'react'

import { firestoreDB } from '../utils/firebase.js'

import SelectCategoryForm from './SelectCategoryForm.jsx'
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
  const [categories, setCategories] = useState(['cowes', 'mont-albert-road'])
  const [category, setCategory] = useState('cowes')

  let location = props.location
  let match = props.match
  // let category = 'mont-albert-road'
  let year = '2018-2019'

  let queryPath = `items/${year}/${category}`
  // console.log("queryPath:", queryPath)

  useEffect(() => { // get item categories

    console.log("Items useEffect 2...Get Categories ...")
  
    const unsubscribe = firestoreDB.collection('items').doc('2018-2019')
      .onSnapshot(function (doc) {
        console.log("Categories: ", doc.data().colls.toString())
        setCategories(doc.data().colls)
      })
    return () => {

      // Clean up the listener subscription
      console.log("Clean up the Items useEffect listener subscription...")
      unsubscribe()

    }

  }, [])

  useEffect(() => { // get item documents for the selected path/category

    console.log("Items useEffect 1 ... ")

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
      unsubscribe()
      
    }

  }, [queryPath])

  return (

    <>
      <div className="App">
        <header className="App-header">
          <SelectCategoryForm categories={categories} onChange={setCategory} />
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
