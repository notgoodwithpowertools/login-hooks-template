import React, { useContext, useReducer, useEffect, useState } from 'react'

import { firestoreDB } from '../utils/firebase.js'

import { AuthContext } from '../context/AuthContext.js'
import { ItemsCat1Context } from '../context/ItemsCat1Context.js'

import itemsReducer from '../reducers/itemsReducer.js'

import AddItemForm from './AddItemForm.jsx'
import ItemsTablePage from './ItemsTablePage.jsx'
import CategoriesComp from './CategoriesComp.jsx'

import '../css/ItemsPage.css'

const Items = (props) => {

  console.log("Items +++++++++++++++++++++++++++++++++++++++++++++++++")
  
  const { userAuth } = useContext(AuthContext)
  console.log("AuthContextValues:", userAuth)

  const cat1List = useContext(ItemsCat1Context)
  console.log("Context Cat1List", cat1List)

  const [cat1State, itemsDispatch] = useReducer(itemsReducer, { cat1List, selected: 0 })
  console.log("cat1:", cat1State)

  const [categories, setCategories] = useState([])

  let db = 'items'
  let cat1Cat = cat1State.cat1List[cat1State.selected]
  let year = cat1Cat
  let dbPath = `${db}/${cat1Cat}`
  console.log("dbPath:", dbPath)

  useEffect(() => { // get item categories

    console.log("Items useEffect 1...Get Categories ...", year)

    const unsubscribe = firestoreDB.collection(db).doc(year)
      .onSnapshot(function (doc) {
        console.log("Categories: ", doc.data().colls.toString())
        setCategories(doc.data().colls)
      })
    return () => {

      // Clean up the listener subscription
      console.log("Clean up the Items useEffect listener subscription...")
      unsubscribe()

    }

  }, [db, year])

  return (

    <>
      <ItemsCat1Context.Provider value={{ cat1State, itemsDispatch }} >

        <div className="ItemsPage">
          <AddItemForm dbPath={dbPath} categories={categories} />
          <div className='ItemsTablePage'>
            <ItemsTablePage dbPath={dbPath} categories={categories} />
          </div>
          <CategoriesComp cat1={cat1Cat} categories={categories} />
        </div>

      </ItemsCat1Context.Provider>
    </>

  )
}

export { Items as default }
