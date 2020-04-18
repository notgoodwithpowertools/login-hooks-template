import React, { useContext, useEffect, useState } from 'react'

import { firestoreDB } from '../utils/firebase.js'

import AddItemForm from './AddItemForm.jsx'
import ItemsTablePage from './ItemsTablePage.jsx'

// import '../App.css'
import '../css/ItemsPage.css'

import { AuthContext } from '../context/AuthContext.js'

const Items = (props) => {

  const { userAuth } = useContext(AuthContext)
  console.log("AuthContextValues:", userAuth)

  const [categories, setCategories] = useState(['cat1', 'cat2'])

  let db = 'items'
  let year = '2018-2019'

  let dbPath = `${db}/${year}`

  useEffect(() => { // get item categories

    console.log("Items useEffect 2...Get Categories ...")

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
      {/* <div className="App">
        <header className="App-header"> */}
          {/* <SelectCategoryForm categories={categories} onChange={setCategory} /> */}

          <div className="ItemsPage">
            <AddItemForm dbPath={dbPath} categories={categories} />
            <div className='ItemsTablePage'>
              <ItemsTablePage dbPath={dbPath} categories={categories} />
            </div>
          </div>

        {/* </header>
      </div> */}
    </>

  )
}

export { Items as default }
